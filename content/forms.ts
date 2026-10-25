// Copy shared by every form. Copy for a single form lives with that form's content.
export const formCopy = {
  optional: "Optional",
  choose: "Choose an option",
  sending: "Sending…",
  honeypot: "Leave this field empty",
  privacy: {
    text: "We'll only use your details to reply to you. See our",
    link: { label: "Privacy Policy", href: "/policies/privacy" },
  },
  errors: {
    fullName: "Enter your full name.",
    email: "Enter your email address.",
    emailFormat: "Enter a valid email address, like name@example.com.",
    website: "Enter a valid web address, like example.com.",
    choice: "Choose one of the options.",
    tooShort: (min: number) => `Tell us a little more: at least ${min} characters.`,
    tooLong: (max: number) => `Keep this under ${max.toLocaleString("en")} characters.`,
    send: "We couldn't send your request just now. Please try again in a few minutes.",
    network: "We couldn't reach our server. Check your connection and try again.",
  },
};
