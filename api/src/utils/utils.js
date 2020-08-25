const fs = require("fs");

/**
 * Save image to filesystem.
 * This function will create directory if that doesn't already exist.
 *
 * @param img
 * @param dir
 * @param filename
 * @returns {string}
 */
const writeImageBase64 = (img, dir, filename) => {
  try {
    console.log(dir);
    // Create dir if doesn't exist
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const location = dir + "/" + filename;

    const data = img.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFile(location, data, "base64", (err) => {
      if (err) throw err;
    });

    return location;
  } catch (err) {
    throw err;
  }
};

exports.writeImageBase64 = writeImageBase64;
