import { Injectable } from '@angular/core';
// import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import { CanvasService } from './canvas.service';
import { CanvasService } from './canvas.service';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private canvas: CanvasService) { }

  /** Method to set PDF Title */
  setTitle(title: string, page: any, pageSize: string): any {
    // let companyDetail = '';
    let margin;
    let fontSize;

    if (pageSize === 'A6') {
      margin = [15, 10, 0, 10];
      fontSize = 8;
    } else {
      margin = [15, 10, 0, 10];
      fontSize = 10;
    }

    return [
      {
        table: {
          widths: ['35%', '65%'],
          body: [
            [{
              image: null,
              width: 60,
              height: 30,
            }],
            [{ text: title, fontSize, margin: [100, -20, 0, 0] }],
          ],
        },
        layout: 'noBorders',
      },

    ];
  }

  /**  Method for creating PDF table header */
  createTableHeader(header: string[]): any {
    const pageHeader: any = { fila_0: {} };
    header.forEach((attribute, i) => {
      pageHeader.fila_0['col_' + (+i + 1)] = { text: attribute, style: 'tableHeader', margin: [0, 8, 0, 0] };
    });
    return pageHeader;
  }

  /** Method for creating PDF table content */
  createBody(headers: any, records: any[]): any {
    const body = [];
    // tslint:disable-next-line:forin
    for (const key in headers) {
      const row = [];
      // tslint:disable-next-line: forin
      for (const headerKey in headers[key]) {
        row.push(headers[key][headerKey]);
      }
      body.push(row);
    }

    records.forEach((record) => {
      const row = [];
      // tslint:disable-next-line: forin
      for (const key in record) {
        row.push(record[key]);
      }
      body.push(row);
    });
    return body;
  }

  /** Define PDF document definition */
  // tslint:disable-next-line: max-line-length
  getDocDefinition(title: string, header: string[],
    record: object[], orientation: string, columns: string[], pageSize: string): any {

    const page = {
      header: title,
      body: { header, record },
    };
    const body = this.createBody(this.createTableHeader(page.body.header), page.body.record);

    let pageMargin;
    let headerFont;
    let contentFont;
    if (pageSize === 'A6') {
      pageMargin = [10, 110, 10, 55];
      headerFont = 10;
      contentFont = 7;
    } else {
      headerFont = 16;
      contentFont = 10;
      pageMargin = [10, 110, 10, 55];
    }
    const docDefinition = {
      pageOrientation: orientation,
      pageSize,
      pageMargins: pageMargin,
      header: this.setTitle(title, page, pageSize),
      // header: this.setTitle(logo, title, page, pageSize),
      footer: (currentPage: any, pageCount: any) => {
        return { text: 'Page ' + currentPage.toString() + ' of ' + pageCount, alignment: 'center', margin: [0, 30, 0, 0] };
      },

      content: [
        {
          margin: [10, -40, 10, 10],
          style: 'tableContent',
          table: {
            widths: columns,
            headerRows: 1,
            body,
          },
        },
      ],
      styles: {
        header: {
          fontSize: headerFont,
          bold: true,
        },
        tableHeader: {
          bold: true,
        },
        tableContent: {
          fontSize: contentFont,
        },
      },
    };
    return docDefinition;
  }

  generatePdf(docDefinition: any): void {
    const pdfObject = pdfMake.createPdf(docDefinition);
    // On a browser simply use download!
    pdfObject.download();
  }

  getPdfData(data: any[]): void {
    const columns = ['40%', '15%', '45%'];
    const header = ['Name', 'Gender', 'Counter'];


    const title = 'Student Information';
    // tslint:disable-next-line: max-line-length
    this.generatePdf(this.getDocDefinition(title, header, this.mapData(data), 'portrait', columns, 'A4'));
    // this.canvas.getBase64Image('./assets/images/logo.png')
    //   .then((base64Img: any) => {
    //     const logo = base64Img;
    //   });

  }

  // tslint:disable-next-line: typedef
  mapData(data: any[]): any {
    return data.map((item) => {
      return {
        Name: item.fecha_f,
        Gender: item.hora,
        Country: `${item.nro_serie}-${item.nro_correlativo}`
      };
    });
  }
}