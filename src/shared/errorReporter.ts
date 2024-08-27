import { errorToast } from "@/shared/toasts/errorToast";
// SHOUTOUT https://fettblog.eu/typescript-typing-catch-clauses/

export function errorReporter(err: any, showToast: boolean = true) {
  console.log('errorReporter...')

  if (typeof err === "string") {
    // The error is a string
    console.error(err);
    showToast && errorToast(err.toString());
  } else {
    // everything else
    console.error(err);
    showToast && errorToast(err.toString());
  }
}
