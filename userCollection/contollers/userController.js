const userModel = require("../modal/userdataModal");
// const { generatePDF } = require("./pdfController");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));

const getUserData = async (req, res) => {
  try {
    const { id } = req.params;
    // const userId = req.userId;

    const user = await userModel.findOne({ _id: id});
    // console.log(typeof user);
    // console.log(user);
    const doc = new PDFDocument({
      size: "A3",
      margins: { top: 50, bottom: 50, left: 40, right: 40 },
    });
     // Set the PDF headers to prompt the user for download
     res.setHeader("Content-Type", "application/pdf");
     res.setHeader("Content-Disposition", `attachment; filename=user_${user.name}.pdf`);
    // console.log("Margins:", doc.page.margins);
    // console.log("Page Height:", doc.page.height);
    const pageColor = "#f5f5f5";

    // const filePath = path.resolve(__dirname, "user.pdf");
    // const stream = fs.createWriteStream(filePath);

    doc.info.Title = "Object to PDF Example";
    doc.rect(0, 0, doc.page.width, doc.page.height).fillColor(pageColor).fill();

    doc
      .fontSize(27)
      .font("Helvetica-Bold")
      .fillColor("blue")
      .text(`${user.name}`, {
        width: 410,
        align: "left",
      });
    doc.moveDown(0.3);
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(`${user.title}`, {
        width: 410,
        align: "left",
      });
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(`${user.address}`, {
        width: 410,
        align: "left",
      });

    doc.moveUp(3);
    const rightColumnX = doc.page.width - doc.page.margins.right;
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(`Email : ${user.email}`, rightColumnX - 410, doc.y, {
        align: "right",
      });
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(`Mobile No : ${user.mNumber}`, rightColumnX - 410, doc.y, {
        align: "right",
      });
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(`Linkedln : ${user.linkedln}`, rightColumnX - 410, doc.y, {
        align: "right",
      });

    const leftMargin = 40;
    const rightMargin = 40;
    const lineGap = -0.8;
    const additionalGap = 3.0;

    const bulletRadius = 2;
    const textIndent = 15;
    const bulletIndent = 5;

    // for Professional Summary

    if (user.professionalSummary && user.professionalSummary.length > 0) {
      doc.moveDown();
      doc.lineWidth(25);
      doc
        .strokeColor("blue")
        .lineCap("butt")
        .moveTo(40, 150)
        .lineTo(800, 150)

        .stroke();
      doc.fillColor("white");
      const textX = 10;
      const textY = 155;
      doc.moveTo(textX, textY);

      doc.fontSize(16);
      doc.text("Professional Summary", textX, textY - 10, { align: "center" });

      doc.fontSize(12);
      doc.moveDown();

      user.professionalSummary.forEach((item) => {
        doc.moveDown();
        doc.font("Helvetica");
        doc
          .circle(
            leftMargin + bulletIndent + bulletRadius,
            doc.y + 2,
            bulletRadius
          )
          .fill("black");
        doc.text(
          item,
          leftMargin + bulletIndent + bulletRadius + textIndent,
          doc.y - 2,
          {
            align: "justify",
            width: doc.page.width - leftMargin - rightMargin - 23,
          }
        );
        doc.moveDown(lineGap);
      });
    }

    //for skillset

    const lineWidth = doc.page.width - leftMargin - rightMargin;
    doc.moveDown(additionalGap);
    doc
      .moveTo(leftMargin, doc.y)
      .strokeColor("blue")
      .lineWidth(25)
      .lineTo(leftMargin + lineWidth, doc.y)
      .stroke();

    const headingText = "SkillSet";
    doc.font("Helvetica-Bold");
    doc
      .fontSize(16)
      .fillColor("white")
      .text(headingText, leftMargin, doc.y - 5, {
        align: "center",
        width: lineWidth,
      });
    doc.moveDown();

    const skillLeftMargin = leftMargin + 190;
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(`Technologies :  `, {})
      .font("Helvetica");
    doc.moveUp(1);
    doc.text(`${user.skillSet.technology}`, skillLeftMargin, doc.y - 2, {
      align: "justify",
      width: doc.page.width - leftMargin - rightMargin - 193,
    });
    doc.text("", leftMargin);
    
    doc.moveDown();
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(`Languages : `, {});
    doc.moveUp(1);
    doc
      .font("Helvetica")
      .text(`${user.skillSet.language}`, skillLeftMargin, doc.y - 2, {
        align: "justify",
        width: doc.page.width - leftMargin - rightMargin - 193,
      });
      doc.text("", leftMargin);
    doc.moveDown();
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(`Tool :  `, {});
    doc.moveUp(1);
    doc
      .font("Helvetica")
      .text(`${user.skillSet.tools}`, skillLeftMargin, doc.y - 2, {
        align: "justify",
        width: doc.page.width - leftMargin - rightMargin - 193,
      });
      doc.text("", leftMargin);
    doc.moveDown();
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(`Database :  `, {});
    doc.moveUp(1);
    doc
      .font("Helvetica")
      .text(`${user.skillSet.databaseName}`, skillLeftMargin, doc.y - 2, {
        align: "justify",
        width: doc.page.width - leftMargin - rightMargin - 193,
      });
      doc.text("", leftMargin);
    doc.moveDown();
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(`Operating System :  `, {});
    doc.moveUp(1);
    doc
      .font("Helvetica")
      .text(`${user.skillSet.operatingSys}`, skillLeftMargin, doc.y - 2, {
        align: "justify",
        width: doc.page.width - leftMargin - rightMargin - 193,
      });
      doc.text("", leftMargin);
    doc.moveDown();
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(`IDE Used : `, {});
    doc.moveUp(1);
    doc
      .font("Helvetica")
      .text(`${user.skillSet.ideUsed}`, skillLeftMargin, doc.y - 2, {
        align: "justify",
        width: doc.page.width - leftMargin - rightMargin - 193,
      });
      doc.text("", leftMargin);

    // For Work Experience Details
    if (user.workExp && user.workExp.length > 0) {
      doc.moveDown(additionalGap);
      doc
        .moveTo(leftMargin, doc.y)
        .lineTo(leftMargin + lineWidth, doc.y)
        .stroke();

      const Text = "Work Experience";
      doc.font("Helvetica-Bold");
      doc
        .fontSize(16)
        .fillColor("white")
        .text(Text, leftMargin, doc.y - 5, {
          align: "center",
          width: lineWidth,
        });
      const baseLeftMargin = 40;

      user.workExp.forEach((item) => {
        doc.moveDown(2);
        doc
          .fontSize(12)
          .font("Helvetica-Bold")
          .fillColor("black")
          .text(
            `${item.company} at ${item.designation} (${item.startDates} - ${item.endDates})`
          );
        if (item.projects && item.projects.length > 0) {
          doc.moveDown(0);

          item.projects.forEach((pItem, index, arr) => {
            doc.moveDown(3);
            if (pItem.projectName) {
              doc
                .fontSize(12)
                .font("Helvetica-Bold")
                .text(`Project:                      `, {
                  continued: true,
                  align: "left",
                })
                .font("Helvetica-Bold")
                .text(`     ${pItem.projectName}`, { align: "left" });
            }
            if (pItem.projectDescription) {
              doc.moveDown();

              const rightShift = 100;
              const descriptionLeftMargin = baseLeftMargin + 133;
              doc
                .fontSize(12)
                .font("Helvetica-Bold")
                .text(`Description:      `, {});
              doc.moveUp(1);
              doc

                .font("Helvetica")
                .text(
                  `${pItem.projectDescription}`,
                  descriptionLeftMargin,
                  doc.y - 2,
                  {
                    align: "justify",
                    width: doc.page.width - leftMargin - rightMargin - 140,
                  }
                );
              doc.text("", leftMargin);
            }
            if (pItem.projectTechnology) {
              doc.moveDown();
              const TechnologyLeftMargin = baseLeftMargin + 133;
              doc
                .fontSize(12)
                .font("Helvetica-Bold")
                .text(`Technologies:   `, {});
              doc.moveUp(1);
              doc
                .font("Helvetica")
                .text(
                  `${pItem.projectTechnology}`,
                  TechnologyLeftMargin,
                  doc.y - 2,
                  {
                    align: "justify",
                    width: doc.page.width - leftMargin - rightMargin - 140,
                  }
                );
              doc.text("", leftMargin);
            }
            if (pItem.responsibilities && pItem.responsibilities.length > 0) {
              doc.moveDown();
              doc.font("Helvetica-Bold");
              doc.text(`Responsibilities:      `, {});

              doc.moveUp(1.5);
              const responsibilityLeftMargin = baseLeftMargin + 130;
              pItem.responsibilities.forEach((rItem, rIndex, rArr) => {
                doc.moveDown();
                doc.font("Helvetica");
                doc
                  .circle(
                    responsibilityLeftMargin + bulletIndent + bulletRadius,
                    doc.y + 2,
                    bulletRadius,
                    leftMargin
                  )
                  .fill("black");

                doc.text(
                  rItem,
                  responsibilityLeftMargin +
                    bulletIndent +
                    bulletRadius +
                    textIndent,
                  doc.y - 2,
                  {
                    align: "justify",
                    width: doc.page.width - leftMargin - rightMargin - 160,
                  }
                );
                doc.moveDown(lineGap);
                doc.text("", leftMargin);
              });
            }
            // maxLineY = Math.max(maxLineY, doc.y);
          });
        }
        doc.moveDown(3);
        const lineY = doc.y;
        doc.strokeColor("red");
        doc.lineWidth(2);
        doc
          .moveTo(200, doc.y)
          .lineTo(doc.page.width - 200, doc.y)
          .stroke();
      });
    }
    // For Education Details

    doc.moveDown(additionalGap);
    doc
      .moveTo(leftMargin, doc.y)
      .strokeColor("blue")
      .lineWidth(25)
      .lineTo(leftMargin + lineWidth, doc.y)
      .stroke();

    const EducationText = "Education";
    doc.font("Helvetica-Bold");
    doc
      .fontSize(16)
      .fillColor("white")
      .text(EducationText, leftMargin, doc.y - 5, {
        align: "center",
        width: lineWidth,
      });
    doc.moveDown();
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(
        `${user.educationDetails.hQualification} : ${user.educationDetails.university} (${user.educationDetails.passingYear})`,
        {}
      );

    // For Personal Details
    doc.moveDown(additionalGap);
    doc
      .moveTo(leftMargin, doc.y)
      .strokeColor("blue")
      .lineWidth(25)
      .lineTo(leftMargin + lineWidth, doc.y)
      .stroke();
    const PersonalText = "Personal Details";
    doc.font("Helvetica-Bold");
    doc
      .fontSize(16)
      .fillColor("white")
      .text(PersonalText, leftMargin, doc.y - 5, {
        align: "center",
        width: lineWidth,
      });

    doc.moveDown();
    doc
      .fontSize(12)
      .font("Helvetica")
      .fillColor("black")
      .text(`Name :                     `, { continued: true })
      .font("Helvetica-Bold")
      .text(user.name, {});
    doc.moveDown();
    doc
      .fontSize(12)
      .font("Helvetica")
      .fillColor("black")
      .text(`Marrital Status :       `, { continued: true })
      .font("Helvetica-Bold")
      .text(user.mStatus, {});
    doc.moveDown();
    doc
      .fontSize(12)
      .font("Helvetica")
      .fillColor("black")
      .text(`Gender :                   `, { continued: true })
      .font("Helvetica-Bold")
      .text(user.gender, {});

    // For Declaration Details
    doc.moveDown(additionalGap);
    doc
      .moveTo(leftMargin, doc.y)
      .strokeColor("blue")
      .lineWidth(25)
      .lineTo(leftMargin + lineWidth, doc.y)
      .stroke();
    const DeclarationText = "Declaration";
    doc.font("Helvetica-Bold");
    doc
      .fontSize(16)
      .fillColor("white")
      .text(DeclarationText, leftMargin, doc.y - 5, {
        align: "center",
        width: lineWidth,
      });
    doc.moveDown();
    doc
      .fontSize(13)
      .font("Helvetica")
      .fillColor("black")
      .text(
        `I hereby declare that the above furnished details are true to the best of my knowledge`,
        {}
      );
    doc.moveDown();
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fillColor("black")
      .text("Name :     ", { continued: true })
      .font("Helvetica")
      .text(user.name, {});

    doc.pipe(res);

    // Finalize the PDF document
    doc.end();

    console.log("PDF saved successfully");

    res.status(200).sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }
};

// new get data

const getUserDatanew = async (req, res) => {
  try {
    // const { id } = req.params;
    const userId = req.userId;

    const user = await userModel.find({userId});
    // const allData = await userModel.find
    if (!user) {
      res.status(401).send({ status: 401, massage: "user not found" });
    }

    res.status(201).send({
      status: 201,
      massage: " user data found",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }
};

const saveUserData = async (req, res) => {
  
  const {
    userId,
    name,
    email,
    title,
    linkedln,
    mNumber,
    address,
    gender,
    mStatus,
    professionalSummary,
    skillSet,
    educationDetails,
    workExp,
  } = req.body;
  console.log(req.body);
  // Create a new user document and save it to the database
  const newUser = new userModel({
    userId,
    name,
    email,
    title,
    linkedln,
    mNumber,
    address,
    gender,
    mStatus,
    professionalSummary,
    skillSet,
    educationDetails,
    workExp,
  });

  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving user data");
    } else {
      res.send("User data has been saved successfully");
    }
  });
};

const deleteData = async (req, res) => {
  const userId = req.params.id;
  

  try {
    // Find the user by ID and remove it
    const deletedUser = await userModel.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { saveUserData, getUserData, getUserDatanew, deleteData };

// const tableHeaders = ["Name", "Email"];
// const tableData = [
//   [user.name, user.email],
//   // You can add more rows here if needed
// ];

// const column1X = 50;
// const column2X = 150;
// const rowHeight = 20;

// // Draw table headers

// tableHeaders.forEach((header, index) => {
//   doc.moveDown();
//   doc.fontSize(12).text(header, column1X + index * 100, 50);
// });

// // Draw table data
// tableData.forEach((row, rowIndex) => {
//   row.forEach((cell, cellIndex) => {
//     doc
//       .fontSize(10)
//       .text(
//         cell,
//         column1X + cellIndex * 100,
//         50 + (rowIndex + 1) * rowHeight
//       );
//   });
// });
