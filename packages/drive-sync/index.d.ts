export interface DriveFile { id: string; name: string; mime: string; folder: boolean; modified: string; link: string; size: number | null }
export interface DriveClient { list(folderId: string): Promise<DriveFile[]> }
export interface ServiceAccount { client_email: string; private_key: string; [k: string]: unknown }
export function serviceAccountFromEnv(env?: NodeJS.ProcessEnv): ServiceAccount | null;
export function getAccessToken(sa: ServiceAccount, fetchImpl?: typeof fetch): Promise<string>;
export function makeDriveClient(token: string, fetchImpl?: typeof fetch): DriveClient;
export function folderIdFromUrl(url: string | null | undefined): string | null;
export function fileIdFromUrl(url: string | null | undefined): string | null;
export function loadClientData(path: string): { CLIENT: Record<string, unknown>; DATAROOM: unknown[] };
export function norm(s: unknown): string;
export function matchScore(docRow: { no?: string; t: string }, fileName: string): number;
export function scanClient(drive: DriveClient, data: { CLIENT: Record<string, unknown>; DATAROOM: unknown[] }, current?: Record<string, string>): Promise<Record<string, unknown>>;
export function driveFilesFromReport(report: Record<string, unknown>): Record<string, unknown[]>;
