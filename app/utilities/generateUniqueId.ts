function generateUniqueId() {
  // Generate a timestamp-based ID
  const timestamp = new Date().getTime();

  // Append a random number to ensure uniqueness
  const random = Math.floor(Math.random() * 10000);

  return `${timestamp}-${random}`;
}

export { generateUniqueId };
