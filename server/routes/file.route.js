const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");
const upload = require("../middleware/file.middleware");
router.route("/").post(upload.single("file") , fileController.readFile);
router.route("/user/files/:userId").get(fileController.allUserFiles);
router.route("/:fileId").get(fileController.getAFile)
module.exports = router;