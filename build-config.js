module.exports = {
  file_loader: {
    test: [
      /\.zip$/,
      /\.signed$/,
      /\.hex$/,
      /\.mp4$/,
      /\.jpg$/,
      /\.png$/,
      /\.svg$/,
      /\.PNG$/,
      /\.JPG$/,
    ],
  },
  excludeDir: ["temp"],
};
