const lax = /^[A-Za-z0-9!@#$%^&*()\-_=+[\]{}|;:'",.<>?/~]*$/;
const restricted = /^[a-zA-Z0-9_-]*$/;
const laxAndWhitespace = /^[A-Za-z0-9!@#$%^&*()\-_=+[\]{}|;:'",.<>?/~\s]*$/;

export { lax, restricted, laxAndWhitespace };
