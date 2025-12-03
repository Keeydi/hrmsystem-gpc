import { Employee } from '@/types/employee';

const formatDate = (date?: string | null): string => {
  if (!date) return 'N/A';
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return date;
  }
};

const formatShortDate = (date?: string | null): string => {
  if (!date) return 'N/A';
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch {
    return date;
  }
};

const baseStyles = `
  @page { size: letter; margin: 0.75in; }
  * { box-sizing: border-box; }
  body { 
    font-family: 'Arial', 'Helvetica Neue', sans-serif; 
    line-height: 1.5; 
    color: #1a1a1a; 
    font-size: 11px;
    margin: 0;
    padding: 0;
  }
  h1, h2, h3 { margin: 0; }
  .header { 
    text-align: center; 
    margin-bottom: 20px; 
    border-bottom: 2px solid #1e40af;
    padding-bottom: 15px;
  }
  .header h1 { 
    font-size: 18px; 
    font-weight: bold; 
    color: #1e40af;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }
  .header p { 
    margin: 2px 0; 
    font-size: 10px; 
    color: #4b5563;
  }
  .section { 
    margin-top: 16px; 
    page-break-inside: avoid;
  }
  .section-title { 
    background: #1e40af; 
    color: white; 
    padding: 6px 12px; 
    font-size: 11px; 
    font-weight: bold; 
    text-transform: uppercase; 
    letter-spacing: 0.5px;
    margin-bottom: 0;
  }
  table { 
    width: 100%; 
    border-collapse: collapse; 
    font-size: 10px; 
  }
  th, td { 
    border: 1px solid #d1d5db; 
    padding: 6px 8px; 
    text-align: left; 
    vertical-align: top;
  }
  th { 
    background: #f3f4f6; 
    font-weight: 600; 
    color: #374151;
    width: 30%;
  }
  td {
    background: white;
  }
  .signature-section { 
    margin-top: 40px; 
    display: flex; 
    justify-content: space-between; 
    page-break-inside: avoid;
  }
  .signature-box { 
    width: 45%; 
    text-align: center; 
  }
  .signature-line { 
    border-top: 1px solid #1a1a1a; 
    margin-top: 50px; 
    padding-top: 4px; 
    font-size: 10px;
    font-weight: 600;
  }
  .signature-title {
    font-size: 9px;
    color: #6b7280;
  }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .grid-2 > div {
    border: 1px solid #d1d5db;
    border-top: none;
  }
  .grid-2 > div:nth-child(odd) {
    border-right: none;
  }
  .label {
    font-size: 9px;
    color: #6b7280;
    text-transform: uppercase;
    font-weight: 600;
    display: block;
    margin-bottom: 2px;
  }
  .value {
    font-size: 11px;
    color: #1a1a1a;
    padding: 4px 8px;
  }
  .note {
    font-size: 9px;
    color: #6b7280;
    font-style: italic;
    margin-top: 8px;
  }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`;

export const generateCertificateOfEmployment = (employee: Employee): string => {
  const currentDate = formatDate(new Date().toISOString());

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Certificate of Employment - ${employee.fullName}</title>
    <style>
      ${baseStyles}
      .coe-content { 
        text-align: justify; 
        line-height: 2; 
        margin-top: 30px; 
        font-size: 12px;
      }
      .coe-content p { 
        margin: 0 0 20px; 
        text-indent: 40px; 
      }
      .document-title {
        text-align: center;
        margin: 30px 0;
        font-size: 16px;
        font-weight: bold;
        text-decoration: underline;
        letter-spacing: 2px;
      }
      .to-whom {
        margin: 30px 0;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>THE GREAT PLEBEIAN COLLEGE</h1>
      <p>General Pedro Corpus, San Vicente, Palawan</p>
      <p>Email: info@gpcc.edu.ph | Tel: (048) 123-4567</p>
    </div>

    <div class="document-title">CERTIFICATE OF EMPLOYMENT</div>

    <div class="to-whom">TO WHOM IT MAY CONCERN:</div>

    <div class="coe-content">
      <p>
        This is to certify that <strong>${employee.fullName.toUpperCase()}</strong>, 
        with Employee ID <strong>${employee.employeeId}</strong>, 
        ${employee.status === 'inactive' ? 'was formerly' : 'is presently'} employed at 
        <strong>The Great Plebeian College</strong>${employee.position ? ` as <strong>${employee.position}</strong>` : ''}${employee.department ? ` under the <strong>${employee.department}</strong> Department` : ''}.
      </p>
      <p>
        ${employee.dateHired ? `${employee.status === 'inactive' ? 'He/She served' : 'He/She has been serving'} the institution since <strong>${formatDate(employee.dateHired)}</strong>${employee.dateOfLeaving ? ` until <strong>${formatDate(employee.dateOfLeaving)}</strong>` : ''}.` : 'He/She is in good standing with the institution.'}
      </p>
      <p>
        This certificate is issued upon the request of the above-named individual for whatever legal purpose it may serve.
      </p>
      <p>
        Issued this <strong>${currentDate}</strong> at San Vicente, Palawan.
      </p>
    </div>

    <div class="signature-section">
      <div class="signature-box">
        <div class="signature-line">
          <strong>HR MANAGER</strong>
          <div class="signature-title">Human Resources Department</div>
        </div>
      </div>
      <div class="signature-box">
        <div class="signature-line">
          <strong>SCHOOL ADMINISTRATOR</strong>
          <div class="signature-title">Office of the Administrator</div>
        </div>
      </div>
    </div>
  </body>
</html>
`;
};

export const generatePersonalDataSheet = (employee: Employee): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Personal Data Sheet - ${employee.fullName}</title>
    <style>
      ${baseStyles}
      .pds-photo {
        width: 120px;
        height: 120px;
        border: 1px solid #d1d5db;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 9px;
        color: #9ca3af;
        background: #f9fafb;
      }
      .form-row {
        display: flex;
        border: 1px solid #d1d5db;
        border-top: none;
      }
      .form-row:first-child {
        border-top: 1px solid #d1d5db;
      }
      .form-cell {
        flex: 1;
        padding: 6px 8px;
        border-right: 1px solid #d1d5db;
      }
      .form-cell:last-child {
        border-right: none;
      }
      .form-cell.small {
        flex: 0.5;
      }
      .form-cell.large {
        flex: 2;
      }
      .instructions {
        background: #fef3c7;
        border: 1px solid #f59e0b;
        padding: 8px 12px;
        font-size: 9px;
        margin-bottom: 15px;
      }
      .cs-form-no {
        text-align: right;
        font-size: 9px;
        color: #6b7280;
        margin-bottom: 5px;
      }
    </style>
  </head>
  <body>
    <div class="cs-form-no">CS Form No. 212<br/>Revised 2017</div>
    
    <div class="header">
      <h1>PERSONAL DATA SHEET</h1>
      <p style="font-size: 9px; margin-top: 5px;">WARNING: Any misrepresentation made in the Personal Data Sheet and the Work Experience Sheet shall cause the filing of administrative/criminal case/s against the person concerned.</p>
    </div>

    <div class="instructions">
      <strong>INSTRUCTIONS:</strong> Print all entries clearly using black ink. Do not abbreviate. Mark appropriate boxes with an "X".
    </div>

    <div class="section">
      <div class="section-title">I. PERSONAL INFORMATION</div>
      <table>
        <tr>
          <th style="width: 25%;">Full Name</th>
          <td colspan="3"><strong>${employee.fullName || 'N/A'}</strong></td>
        </tr>
        <tr>
          <th>Surname</th>
          <td>${employee.lastName || 'N/A'}</td>
          <th style="width: 15%;">First Name</th>
          <td>${employee.firstName || 'N/A'}</td>
        </tr>
        <tr>
          <th>Middle Name</th>
          <td>${employee.middleName || 'N/A'}</td>
          <th>Name Extension</th>
          <td>${employee.suffixName || 'N/A'}</td>
        </tr>
        <tr>
          <th>Date of Birth</th>
          <td>${formatDate(employee.dateOfBirth)}</td>
          <th>Gender</th>
          <td>${employee.gender || 'N/A'}</td>
        </tr>
        <tr>
          <th>Civil Status</th>
          <td>${employee.civilStatus || 'N/A'}</td>
          <th>Citizenship</th>
          <td>Filipino</td>
        </tr>
        <tr>
          <th>Residential Address</th>
          <td colspan="3">${employee.address || 'N/A'}</td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td>${employee.email || 'N/A'}</td>
          <th>Mobile No.</th>
          <td>${employee.phone || 'N/A'}</td>
        </tr>
        <tr>
          <th>Emergency Contact</th>
          <td colspan="3">${employee.emergencyContact || 'N/A'}</td>
        </tr>
      </table>
    </div>

    <div class="section">
      <div class="section-title">II. EMPLOYMENT INFORMATION</div>
      <table>
        <tr>
          <th>Employee ID</th>
          <td><strong>${employee.employeeId}</strong></td>
          <th style="width: 15%;">Status</th>
          <td>${employee.status === 'active' ? 'ACTIVE' : 'INACTIVE'}</td>
        </tr>
        <tr>
          <th>Department</th>
          <td>${employee.department || 'N/A'}</td>
          <th>Position</th>
          <td>${employee.position || 'N/A'}</td>
        </tr>
        <tr>
          <th>Employment Type</th>
          <td>${employee.employmentType || 'N/A'}</td>
          <th>Role</th>
          <td>${employee.role || 'N/A'}</td>
        </tr>
        <tr>
          <th>Date Hired</th>
          <td>${formatDate(employee.dateHired)}</td>
          <th>Date of Leaving</th>
          <td>${employee.dateOfLeaving ? formatDate(employee.dateOfLeaving) : 'N/A'}</td>
        </tr>
      </table>
    </div>

    <div class="section">
      <div class="section-title">III. GOVERNMENT ID NUMBERS</div>
      <table>
        <tr>
          <th>SSS Number</th>
          <td>${employee.sssNumber || 'N/A'}</td>
          <th style="width: 15%;">TIN</th>
          <td>${employee.tinNumber || 'N/A'}</td>
        </tr>
        <tr>
          <th>Pag-IBIG MID No.</th>
          <td>${employee.pagibigNumber || 'N/A'}</td>
          <th>PhilHealth No.</th>
          <td>N/A</td>
        </tr>
      </table>
    </div>

    <div class="section">
      <div class="section-title">IV. EDUCATIONAL BACKGROUND</div>
      <table>
        <tr>
          <th>Educational Attainment</th>
          <td colspan="3">${employee.educationalBackground || 'N/A'}</td>
        </tr>
      </table>
    </div>

    <div style="margin-top: 30px; font-size: 10px;">
      <p>I declare under oath that I have personally accomplished this Personal Data Sheet which is a true, correct, and complete statement pursuant to the provisions of pertinent laws, rules and regulations of the Republic of the Philippines.</p>
    </div>

    <div class="signature-section">
      <div class="signature-box">
        <div class="signature-line">
          <strong>Signature</strong>
          <div class="signature-title">Date: ${formatDate(new Date().toISOString())}</div>
        </div>
      </div>
      <div class="signature-box">
        <div style="width: 100px; height: 100px; border: 1px solid #d1d5db; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #9ca3af;">
          ID Picture<br/>(Passport Size)
        </div>
      </div>
    </div>
  </body>
</html>
`;

export const generateServiceRecord = (employee: Employee): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Service Record - ${employee.fullName}</title>
    <style>
      ${baseStyles}
      .sr-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 20px;
        font-size: 11px;
      }
      .sr-info-item {
        display: flex;
      }
      .sr-info-label {
        font-weight: 600;
        min-width: 120px;
        color: #4b5563;
      }
      .sr-info-value {
        color: #1a1a1a;
      }
      .record-table th {
        background: #1e40af;
        color: white;
        text-align: center;
        font-size: 9px;
      }
      .record-table td {
        text-align: center;
        font-size: 10px;
      }
      .certification-text {
        margin-top: 30px;
        font-size: 10px;
        text-align: justify;
        line-height: 1.8;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>THE GREAT PLEBEIAN COLLEGE</h1>
      <p>General Pedro Corpus, San Vicente, Palawan</p>
    </div>

    <div style="text-align: center; margin: 25px 0;">
      <h2 style="font-size: 16px; text-decoration: underline; letter-spacing: 2px;">SERVICE RECORD</h2>
    </div>

    <div class="sr-info">
      <div class="sr-info-item">
        <span class="sr-info-label">Employee Name:</span>
        <span class="sr-info-value"><strong>${employee.fullName}</strong></span>
      </div>
      <div class="sr-info-item">
        <span class="sr-info-label">Employee ID:</span>
        <span class="sr-info-value"><strong>${employee.employeeId}</strong></span>
      </div>
      <div class="sr-info-item">
        <span class="sr-info-label">Date of Birth:</span>
        <span class="sr-info-value">${formatDate(employee.dateOfBirth)}</span>
      </div>
      <div class="sr-info-item">
        <span class="sr-info-label">Place of Birth:</span>
        <span class="sr-info-value">N/A</span>
      </div>
    </div>

    <div class="section">
      <table class="record-table">
        <thead>
          <tr>
            <th rowspan="2" style="width: 25%;">SERVICE<br/>(Inclusive Dates)</th>
            <th colspan="2">RECORD OF APPOINTMENT</th>
            <th rowspan="2" style="width: 12%;">SALARY</th>
            <th rowspan="2" style="width: 15%;">STATION/<br/>PLACE</th>
            <th rowspan="2" style="width: 10%;">BRANCH</th>
            <th rowspan="2" style="width: 12%;">L/A/W/P</th>
          </tr>
          <tr>
            <th style="width: 18%;">Designation</th>
            <th style="width: 10%;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              ${formatShortDate(employee.dateHired)} - ${employee.dateOfLeaving ? formatShortDate(employee.dateOfLeaving) : 'PRESENT'}
            </td>
            <td>${employee.position || 'N/A'}</td>
            <td>${employee.employmentType || 'Regular'}</td>
            <td>-</td>
            <td>Main Campus</td>
            <td>${employee.department || 'N/A'}</td>
            <td>-</td>
          </tr>
          <tr>
            <td colspan="7" style="height: 30px;"></td>
          </tr>
          <tr>
            <td colspan="7" style="height: 30px;"></td>
          </tr>
          <tr>
            <td colspan="7" style="height: 30px;"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="certification-text">
      <p>
        <strong>CERTIFICATION:</strong> This is to certify that the above service record is a true and correct account of the services rendered by 
        <strong>${employee.fullName}</strong> as shown by the records on file in this office.
      </p>
    </div>

    <div class="signature-section" style="margin-top: 50px;">
      <div class="signature-box">
        <div class="signature-line">
          <strong>PREPARED BY</strong>
          <div class="signature-title">HR Staff</div>
        </div>
      </div>
      <div class="signature-box">
        <div class="signature-line">
          <strong>CERTIFIED CORRECT</strong>
          <div class="signature-title">HR Manager</div>
        </div>
      </div>
    </div>

    <p class="note" style="margin-top: 30px; text-align: center;">
      Generated on ${formatDate(new Date().toISOString())} | Document ID: SR-${employee.employeeId}-${Date.now().toString(36).toUpperCase()}
    </p>
  </body>
</html>
`;

export const generateFile201Document = (employee: Employee): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>201 File - ${employee.fullName}</title>
    <style>
      ${baseStyles}
      .summary-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 20px;
      }
      .summary-card {
        border: 1px solid #d1d5db;
        border-radius: 4px;
        overflow: hidden;
      }
      .summary-card-header {
        background: #f3f4f6;
        padding: 8px 12px;
        font-weight: 600;
        font-size: 10px;
        text-transform: uppercase;
        color: #374151;
        border-bottom: 1px solid #d1d5db;
      }
      .summary-card-content {
        padding: 12px;
        font-size: 11px;
      }
      .summary-card-content p {
        margin: 4px 0;
      }
      .status-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
      }
      .status-active {
        background: #dcfce7;
        color: #166534;
      }
      .status-inactive {
        background: #fee2e2;
        color: #991b1b;
      }
      .status-complete {
        background: #dbeafe;
        color: #1e40af;
      }
      .status-pending {
        background: #fef3c7;
        color: #92400e;
      }
      .checklist-item {
        display: flex;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #f3f4f6;
      }
      .checklist-item:last-child {
        border-bottom: none;
      }
      .checklist-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        font-size: 10px;
      }
      .checklist-icon.complete {
        background: #dcfce7;
        color: #166534;
      }
      .checklist-icon.pending {
        background: #fef3c7;
        color: #92400e;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>THE GREAT PLEBEIAN COLLEGE</h1>
      <p>Human Resources Department</p>
    </div>

    <div style="text-align: center; margin: 20px 0;">
      <h2 style="font-size: 16px; letter-spacing: 1px;">201 FILE SUMMARY</h2>
      <p style="font-size: 10px; color: #6b7280;">Employee Records Summary Document</p>
    </div>

    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-card-header">Employee Information</div>
        <div class="summary-card-content">
          <p><strong>Name:</strong> ${employee.fullName}</p>
          <p><strong>Employee ID:</strong> ${employee.employeeId}</p>
          <p><strong>Position:</strong> ${employee.position || 'N/A'}</p>
          <p><strong>Department:</strong> ${employee.department || 'N/A'}</p>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-card-header">Employment Details</div>
        <div class="summary-card-content">
          <p><strong>Date Hired:</strong> ${formatDate(employee.dateHired)}</p>
          <p><strong>Employment Type:</strong> ${employee.employmentType || 'N/A'}</p>
          <p><strong>Status:</strong> <span class="status-badge ${employee.status === 'active' ? 'status-active' : 'status-inactive'}">${employee.status?.toUpperCase() || 'N/A'}</span></p>
          ${employee.dateOfLeaving ? `<p><strong>Date of Leaving:</strong> ${formatDate(employee.dateOfLeaving)}</p>` : ''}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Contact Information</div>
      <table>
        <tr>
          <th style="width: 25%;">Email Address</th>
          <td>${employee.email || 'N/A'}</td>
          <th style="width: 20%;">Phone Number</th>
          <td>${employee.phone || 'N/A'}</td>
        </tr>
        <tr>
          <th>Address</th>
          <td colspan="3">${employee.address || 'N/A'}</td>
        </tr>
        <tr>
          <th>Emergency Contact</th>
          <td colspan="3">${employee.emergencyContact || 'N/A'}</td>
        </tr>
      </table>
    </div>

    <div class="section">
      <div class="section-title">Government IDs</div>
      <table>
        <tr>
          <th style="width: 25%;">SSS Number</th>
          <td>${employee.sssNumber || 'N/A'}</td>
          <th style="width: 20%;">TIN</th>
          <td>${employee.tinNumber || 'N/A'}</td>
        </tr>
        <tr>
          <th>Pag-IBIG Number</th>
          <td colspan="3">${employee.pagibigNumber || 'N/A'}</td>
        </tr>
      </table>
    </div>

    <div class="section">
      <div class="section-title">Document Compliance Checklist</div>
      <div style="padding: 12px; border: 1px solid #d1d5db; border-top: none;">
        <div class="checklist-item">
          <div class="checklist-icon ${employee.pdsFile ? 'complete' : 'pending'}">${employee.pdsFile ? '✓' : '○'}</div>
          <div style="flex: 1;">Personal Data Sheet (PDS)</div>
          <span class="status-badge ${employee.pdsFile ? 'status-complete' : 'status-pending'}">${employee.pdsFile ? 'On File' : 'Pending'}</span>
        </div>
        <div class="checklist-item">
          <div class="checklist-icon ${employee.serviceRecordFile ? 'complete' : 'pending'}">${employee.serviceRecordFile ? '✓' : '○'}</div>
          <div style="flex: 1;">Service Record</div>
          <span class="status-badge ${employee.serviceRecordFile ? 'status-complete' : 'status-pending'}">${employee.serviceRecordFile ? 'On File' : 'Pending'}</span>
        </div>
        <div class="checklist-item">
          <div class="checklist-icon ${employee.signatureFile ? 'complete' : 'pending'}">${employee.signatureFile ? '✓' : '○'}</div>
          <div style="flex: 1;">Signature Specimen</div>
          <span class="status-badge ${employee.signatureFile ? 'status-complete' : 'status-pending'}">${employee.signatureFile ? 'On File' : 'Pending'}</span>
        </div>
        <div class="checklist-item">
          <div class="checklist-icon ${employee.registeredFaceFile ? 'complete' : 'pending'}">${employee.registeredFaceFile ? '✓' : '○'}</div>
          <div style="flex: 1;">Face Registration (Biometric)</div>
          <span class="status-badge ${employee.registeredFaceFile ? 'status-complete' : 'status-pending'}">${employee.registeredFaceFile ? 'Completed' : 'Pending'}</span>
        </div>
        <div class="checklist-item">
          <div class="checklist-icon ${employee.sssNumber ? 'complete' : 'pending'}">${employee.sssNumber ? '✓' : '○'}</div>
          <div style="flex: 1;">SSS Registration</div>
          <span class="status-badge ${employee.sssNumber ? 'status-complete' : 'status-pending'}">${employee.sssNumber ? 'Submitted' : 'Pending'}</span>
        </div>
        <div class="checklist-item">
          <div class="checklist-icon ${employee.pagibigNumber ? 'complete' : 'pending'}">${employee.pagibigNumber ? '✓' : '○'}</div>
          <div style="flex: 1;">Pag-IBIG Registration</div>
          <span class="status-badge ${employee.pagibigNumber ? 'status-complete' : 'status-pending'}">${employee.pagibigNumber ? 'Submitted' : 'Pending'}</span>
        </div>
        <div class="checklist-item">
          <div class="checklist-icon ${employee.tinNumber ? 'complete' : 'pending'}">${employee.tinNumber ? '✓' : '○'}</div>
          <div style="flex: 1;">TIN Registration</div>
          <span class="status-badge ${employee.tinNumber ? 'status-complete' : 'status-pending'}">${employee.tinNumber ? 'Submitted' : 'Pending'}</span>
        </div>
      </div>
    </div>

    ${employee.archivedReason ? `
    <div class="section">
      <div class="section-title" style="background: #991b1b;">Separation Information</div>
      <table>
        <tr>
          <th style="width: 25%;">Date of Leaving</th>
          <td>${formatDate(employee.dateOfLeaving)}</td>
        </tr>
        <tr>
          <th>Reason for Separation</th>
          <td>${employee.archivedReason}</td>
        </tr>
        <tr>
          <th>Archived Date</th>
          <td>${formatDate(employee.archivedDate)}</td>
        </tr>
      </table>
    </div>
    ` : ''}

    <div class="signature-section" style="margin-top: 40px;">
      <div class="signature-box">
        <div class="signature-line">
          <strong>PREPARED BY</strong>
          <div class="signature-title">HR Staff</div>
        </div>
      </div>
      <div class="signature-box">
        <div class="signature-line">
          <strong>NOTED BY</strong>
          <div class="signature-title">HR Manager</div>
        </div>
      </div>
    </div>

    <p class="note" style="margin-top: 25px; text-align: center;">
      Generated on ${formatDate(new Date().toISOString())} | Document ID: 201-${employee.employeeId}-${Date.now().toString(36).toUpperCase()}
    </p>
  </body>
</html>
`;

export type DocumentTemplateKey = 'pds' | 'file201' | 'coe' | 'serviceRecord';

export const generateDocumentByTemplate = (key: DocumentTemplateKey, employee: Employee): string => {
  switch (key) {
    case 'pds':
      return generatePersonalDataSheet(employee);
    case 'file201':
      return generateFile201Document(employee);
    case 'serviceRecord':
      return generateServiceRecord(employee);
    case 'coe':
    default:
      return generateCertificateOfEmployment(employee);
  }
};
