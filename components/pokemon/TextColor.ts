export const TextColor = (type: any) => {
  if (type?.includes('grass')) {
    return 'success';
  } else if (type?.includes('water')) {
    return 'primary';
  } else if (type?.includes('fire')) {
    return '#ff8000';
  } else if (type?.includes('electric')) {
    return 'warning';
  } else if (type?.includes('poison')) {
    return 'secondary';
  } else if (type?.includes('ground')) {
    return '#591F0B';
  } else if (type?.includes('fairy')) {
    return '#ff4ecd';
  } else if (type?.includes('rock')) {
    return '#9b9b9b';
  } else if (type?.includes('fighting')) {
    return '#ee0e0e';
  } else {
    return 'default';
  }
};
