import { DIALOG_OPEN, DIALOG_CLOSE } from "../types";

/**
 * 다이얼로그 관련 Action 설정
 * @param diff 
 * @returns 
 */

export const dialogOpen = (diff: string) => ({ type: DIALOG_OPEN, payload: diff });
export const dialogClose = () => ({ type: DIALOG_CLOSE });

export type DialogAction = ReturnType<typeof dialogOpen> | ReturnType<typeof dialogClose>;