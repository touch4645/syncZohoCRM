function getAccessToken() {
  let url = "https://accounts.zoho.com/oauth/v2/token";
  url += "?refresh_token=" + PropertiesService.getScriptProperties().getProperty('refresh_token');
  url += "&client_id=" + PropertiesService.getScriptProperties().getProperty('client_id');
  url += "&client_secret=" + PropertiesService.getScriptProperties().getProperty('client_secret');
  url += "&grant_type=refresh_token";
  
  const options = {
    'method' : 'POST',
    'headers' : {
          'Content-Type' : 'application/x-www-form-urlencoded'
          },
    'muteHttpExceptions' : true
  };
  
  const result = UrlFetchApp.fetch(url, options);

  if(result.getResponseCode() !== 200) {
    throw new Error(result.getContentText());
  }
  console.log("{request: getAccessToken, status: success}");
  console.log("{response: ",result.getContentText(),"}");
  
  const access_token = JSON.parse(result.getContentText()).access_token;
  return access_token;
}


function getRecords(table_api_name="Accounts") {
  const access_token = getAccessToken();

  let base_url = "https://www.zohoapis.com/crm/v2/";
  base_url += table_api_name + "?scope=ZohoCRM.modules.ALL";
  
  var param = {
    'method' : 'GET',
    'headers' : {
      'Authorization' : 'Zoho-oauthtoken ' + access_token,
      'Content-Type' : 'application/json'
    },
    'muteHttpExceptions' : true
  };
  
  for(let i = 1; i <= 1; i++) {
    let url = base_url + "&page=" + i;
    const result = UrlFetchApp.fetch(url, param);

    if(result.getResponseCode() !== 200) {
      throw new Error(result.getContentText());
    }
    console.log("{request: getRecords, status: success}");
    console.log("{response: ",result.getContentText(),"}");
    
    const records = JSON.parse(result.getContentText());
  }
//  return records;
}


function main() {
  const table_api_names = ["Accounts"];
  
  for(let table_api_name in table_api_names) {
    const records = getRecords(table_api_name);
  }
}