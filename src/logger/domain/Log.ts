export class Log {
  //Could implement uuid for id, datetime for timestamp wont hurt either.
  id: string;
  message: string;
  timestamp: string;

  constructor(id: string, message: string, timestamp: string) {
    this.id = id;
    this.message = message;
    this.timestamp = timestamp;
  }
  public static create(message: string) {
    if (!message) {
      throw new Error('Invalid log, message cannot be empty');
    }
    return new Log(this.createId(), message, Date.now().toString());
  }

  private static createId() {
    const timestamp = Date.now();
    const randomValue = Math.random().toString(36).substring(2);
    const uniqueId = `${timestamp}-${randomValue}`;
    return uniqueId;
  }

  public stringify(): string {
    return JSON.stringify(this);
  }
}
