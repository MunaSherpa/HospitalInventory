import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

function Testesewa() {
  const [formData, setFormData] = useState({
    amount: '100',
    tax_amount: '0',
    total_amount: '100',
    transaction_uuid: '11-200-111sss1',
    product_code: 'EPAYTEST',
    product_service_charge: '0',
    product_delivery_charge: '0',
    success_url: 'https://google.com',
    failure_url: 'https://facebook.com',
    signed_field_names: 'total_amount,transaction_uuid,product_code',
    signature: '4Ov7pCI1zIOdwtV2BRMUNjz1upIlT/COTxfLhWvVurE=',
    secret: '8gBm/:&EnhH.1/q'
  });

  useEffect(() => {
    generateSignature();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generateSignature = () => {
    const currentTime = new Date();
    const formattedTime = currentTime.toISOString().slice(2, 10).replace(/-/g, '') + '-' + currentTime.getHours() +
        currentTime.getMinutes() + currentTime.getSeconds();
    setFormData(prevState => ({
      ...prevState,
      transaction_uuid: formattedTime
    }));

    const { total_amount, transaction_uuid, product_code, secret } = formData;

    const hash = CryptoJS.HmacSHA256(
        `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`,
        `${secret}`);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    setFormData(prevState => ({
      ...prevState,
      signature: hashInBase64
    }));
  };

  return (
    <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" target="_blank">
      <br /><br />
      <table>
        <tbody>
          <tr>
            <td><strong>Parameter</strong></td>
            <td><strong>Value</strong></td>
          </tr>
          {Object.entries(formData).map(([key, value]) => (
            <tr key={key}>
              <td>{key.replace(/_/g, ' ')}</td>
              <td>
                <input type="text" id={key} name={key} value={value} className="form" onChange={handleChange} required />
                <br />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <input value="Pay with eSewa" type="submit" className="button" />
    </form>
  );
}

export default Testesewa;
