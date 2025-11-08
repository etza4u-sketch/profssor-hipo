import { GoogleGenAI } from '@google/genai';
import type { GenerateContentParameters, GenerateContentResponse } from '@google/genai';

const MAX_RETRIES = 5;
const INITIAL_DELAY_MS = 2000; // Increased initial delay for retries

// Internal function with retry logic. Not exported.
const generateContentWithRetry = async (
  ai: GoogleGenAI,
  params: GenerateContentParameters
): Promise<GenerateContentResponse> => {
  let lastError: any = null;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent(params);
      return response;
    } catch (e: any) {
      lastError = e;
      if (e.toString().includes('429') || (e.message && e.message.includes('429'))) {
        const delay = (2 ** attempt) * INITIAL_DELAY_MS + Math.random() * 1000;
        console.warn(`Rate limit exceeded. Retrying in ${Math.round(delay / 1000)}s... (Attempt ${attempt + 1}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw e;
      }
    }
  }
  console.error(`Gemini API call failed after ${MAX_RETRIES} retries.`, lastError);
  throw lastError;
};

// --- Queue Logic ---

type QueueItem = {
  ai: GoogleGenAI;
  params: GenerateContentParameters;
  resolve: (response: GenerateContentResponse) => void;
  reject: (error: any) => void;
};

const requestQueue: QueueItem[] = [];
let isProcessing = false;

async function processQueue() {
  if (isProcessing || requestQueue.length === 0) {
    return;
  }

  isProcessing = true;
  const nextJob = requestQueue.shift();

  if (!nextJob) {
    isProcessing = false;
    return;
  }

  const { ai, params, resolve, reject } = nextJob;

  try {
    // The queued job now uses the internal retry logic.
    const response = await generateContentWithRetry(ai, params);
    resolve(response);
  } catch (error) {
    reject(error);
  } finally {
    // Wait longer between processing items to stay within API limits.
    setTimeout(() => {
        isProcessing = false;
        processQueue();
    }, 12000); // Increased delay to 12 seconds to enforce ~5 RPM limit
  }
}

/**
 * Enqueues a request to the Gemini API. This function serializes all
 * API calls to prevent rate-limiting from concurrent requests.
 * It also includes an internal retry mechanism for individual requests.
 */
export const enqueueGenerateContent = (
  ai: GoogleGenAI,
  params: GenerateContentParameters
): Promise<GenerateContentResponse> => {
  return new Promise((resolve, reject) => {
    requestQueue.push({ ai, params, resolve, reject });
    if (!isProcessing) {
      processQueue();
    }
  });
};
