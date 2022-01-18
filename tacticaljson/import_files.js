const importAll = (requireFiles) => {
  const files = {};
  requireFiles.keys().map((item) => {
    files[item.replace('./', '').replace('.json', '')] = requireFiles(item);
  });

  return files;
};

const files = importAll(require.context('./', false, /\.json$/));

export default files;