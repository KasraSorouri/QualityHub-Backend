export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

export const stringLengthCheck = (text: string, length: number, subject: string) => {
  if (text.length < length) {
    console.log(`${subject} is too short, minimum length is ${length}.`);
    throw new Error(`${subject} is too short, minimum length is ${length}.`);
  }
  return true;
};

export const parseDate = (date: unknown): Date => {
  if (!isString(date) || !date) {
    console.log('parse Date Error * raw data:', date);
    throw new Error('Incorrect or missing date 5!');
  }
  return new Date(date);
}

export const parseBoolean = (value: unknown): boolean => {
  if (!isBoolean(value)) {
    console.log('parse Boolean Error * raw data:', value);
    throw new Error('Incorrect or missing data - parseBoolean !');
  }
  return value;
};

export const parseId = (id: unknown): number => {  
  

  if (!isNumber(id)) {
    console.log('parse Id Error * raw data:', id);
    throw new Error('Incorrect or missing data - parseId !');
  }
  console.log('parse Id :', id);
  
  return id;
}
