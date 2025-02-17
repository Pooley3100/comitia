'use client'
import { Response } from "@prisma/client";

export function setCookie(name: string, value?: string, days?: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookie(name: string): null | string {
  if (typeof window === 'undefined') {
    return null;
  }

  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export function eraseCookie(name: string) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//Function to order responses
export function orderResponses(responses: Response[]): Response[] {
  //Quick sort algo for responses
  if (responses.length <= 1) {
    return responses;
  }

  const pivot = responses[0];
  const leftArr: Response[] = [];
  const rightArr: Response[] = [];

  for (let i = 1; i < responses.length; i++) {
    if (responses[i].likes > pivot.likes) {
      leftArr.push(responses[i]);
    } else {
      rightArr.push(responses[i]);
    }
  }

  return [...orderResponses(leftArr), pivot, ...orderResponses(rightArr)];
}

//Create Delete ID
export function createDeleteId(): string {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id: string = '';

  while (id.length < 12) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id
}