
export interface DiagnosisResult {
  diseaseName: string;
  confidence: string;
  description: string;
  treatments: string[];
  preventions: string[];
  timestamp: string;
}

export type AppState = 'landing' | 'uploading' | 'analyzing' | 'result';
