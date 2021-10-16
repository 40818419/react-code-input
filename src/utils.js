export const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const getValueFromProps = ({ forceUppercase, value }) => {
  value = value == null ? '' : value;
  return forceUppercase ? value.toUpperCase() : value;
};

export const getInputArrayFromProps = (props) => {
  const fields = Math.min(32, props.fields);
  const value = getValueFromProps(props);
  return Array.from(Array(fields)).map((_, index) => value[index] || '');
};
