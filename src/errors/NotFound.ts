class NotFound extends Error {
  constructor(content: string) {
    super();
    this.message = `${content} not found.`;
    this.name = "NotFound";
  }
}

export { NotFound };
