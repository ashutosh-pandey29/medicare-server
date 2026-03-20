import { model } from "mongoose";
import Setting from "../../../models/Settings.js";
import { HTTP_CODES } from "../../../utils/httpCodes.js";
import { db } from "../../db/db.service.js";
import { exec } from "child_process";
import { env } from "../../../config/env.js";
import fs from "fs";
import archiver from "archiver";
import path from "path";

// maintenance mode service
export const maintenanceModeService = async (payload) => {
  const { maintenanceMode } = payload;
  const settings = await db.fetchOne(Setting, {});

  if (!settings) {
    settings = await db.createOne(Setting, { maintenanceMode });
  } else {
    await db.updateOne(Setting, { _id: settings._id }, { $set: { maintenanceMode } });
  }

  return {
    httpsStatus: HTTP_CODES.OK,
    message: `Maintenance mode ${maintenanceMode ? "enabled" : "disabled"}`,
  };
};

export const getMaintenanceModeStatus = async () => {
  const settings = await Setting.findOne();

  if (!settings) {
    throw new Error("Settings not found");
  }
  let maintenanceMode = settings.maintenanceMode;
  return {
    httpsStatus: HTTP_CODES.OK,
    message: `Maintenance  mode status fetched.`,
    data: { maintenanceMode },
  };
};

// database backup service

// export const backupDBService = () => {
//   const dumpFolder = "dump";

//   const terminalCommand = `mongodump --uri="${env.MONGO_URI}" --out=${dumpFolder}`;

//   const zipFilePath = path.join(__dirname, `backup-${new Date()}.zip`);

//   exec(terminalCommand, (error, stdout, stderr) => {
//     if (error) {
//       console.log("bkup ", error);
//       // throw error
//     }

//     const output = fs.createWriteStream(zipFilePath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => {
//       console.log("event close ");
//       res.send("db backup");
//     });

//     archive.on("error", (err) => {
//       console.log("failed to crated zip ", err);
//     });

//     archive.pipe(output);
//     archive.directory(dumpFolder, false);

//     archive.finalize();
//   });
// };


export const backupDBService = () => {
  return new Promise((resolve, reject) => {
    const dumpFolder = `dump-${Date.now()}`;

    const command = `mongodump --uri="${env.MONGO_URI}" --out=${dumpFolder}`;

    exec(command, (error) => {
      if (error) {
        return reject(error);
      }

      const archive = archiver("zip", { zlib: { level: 9 } });

      archive.directory(dumpFolder, false);

      archive.on("end", () => {
        fs.rmSync(dumpFolder, { recursive: true, force: true });
      });

      resolve(archive);
    });
  });
};
