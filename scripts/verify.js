const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

async function verifyContract() {
  const contractAddress = '0x95099a987EB2d8Cb514fB3a752E157224Be7fE94';
  const contractName = 'JOSEToken';
  const constructorArgs = [
    '"JOSE Token"',
    '"JOSE"',
    '"1000000000000000000000000"'
  ];

  // Đọc source code contract
  const contractPath = path.join(__dirname, '..', 'contracts', 'JOSEToken.sol');
  const sourceCode = fs.readFileSync(contractPath, 'utf8');

  // Lưu source code vào file tạm
  const tempSourcePath = path.join(__dirname, 'temp_contract.sol');
  fs.writeFileSync(tempSourcePath, sourceCode);

  // Câu lệnh verify (điều chỉnh theo block explorer)
  const verifyCommand = `curl -X POST \
    https://chainscan-newton.0g.ai/api/verify_contract \
    -H "Content-Type: multipart/form-data" \
    -F "addressHash=${contractAddress}" \
    -F "contractName=${contractName}" \
    -F "compilerVersion=v0.8.20" \
    -F "optimization=true" \
    -F "sourceCode=@${tempSourcePath}` +
    constructorArgs.map((arg, index) => ` -F "constructorArguments[${index}]=${arg}"`).join('') +
    `"`;

  exec(verifyCommand, (error, stdout, stderr) => {
    // Xóa file tạm
    fs.unlinkSync(tempSourcePath);

    if (error) {
      console.error(`Verify error: ${error}`);
      return;
    }
    
    console.log('Verification result:', stdout);
  });
}

verifyContract().catch(console.error);