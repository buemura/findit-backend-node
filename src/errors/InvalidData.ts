class InvalidData extends Error {
  constructor() {
    super();
    this.message = "Invalid file type.";
    this.name = "InvalidData";
  }
}

export { InvalidData };
