export class RepositoryNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = "RepositoryNotFoundException";
  }
}