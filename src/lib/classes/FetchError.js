class FetchError extends Error {
  constructor(status) {
    super();
    this.status = status;
  }
}

export default FetchError;
