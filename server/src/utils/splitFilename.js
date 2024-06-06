const splitFileName = link => {
    const fileName = link.split('/').pop().split('.')[0];
    return fileName;
};

export { splitFileName };
