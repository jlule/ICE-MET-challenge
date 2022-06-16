export default class artGetter {
  constructor() {
    this.baseUrl =
      "https://collectionapi.metmuseum.org/public/collection/v1";
  }
  async init() {
      this.getDepartments();
  }
  async getDepartments() {
    let url = " ";
    url = this.baseUrl + "/departments"
    var list = document.querySelector(".department-list");
    var departments = []
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();          
        } else {
          throw Error(response.statusText);
        }
      })
      .then((response) => {
        // console.log(response)
        departments = [...response.departments]
        // console.log(departments);
         for (let i = 0; i < departments.length || i < 20; i++) {
           var option = document.createElement("option");
           option.setAttribute("value", departments[i].departmentId);
           option.innerText = departments[i].displayName;
          //  console.log(departments[i].displayName);
           list.appendChild(option);
         }
      })
      .catch((error) => console.log("There was an error fetching departments!", error));
    
  }
  async getSearch() {
    let url = " ";
    url = this.baseUrl + "/search"
    const formElement = document.forms["art"];
    console.log("Art?");
    const json = this.formDataToJSON(formElement);
    console.log(json);
    url += `?q=${json.q}&isHighlight=${json.isHighlight}&hasImages=${json.hasImages}&isOnView=${json.isOnView}`
    if (json.department != "Any") {
      url += `&departmentId=${json.department}`
    }

    console.log(url);

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();          
        } else {
          throw Error(response.statusText);
        }
      })
      .then((response) => {
        var objects = [...response.objectIDs];
        console.log(objects);
        this.getObject(objects);
      })
      .catch((error) => console.log("There was an error fetching the search!", error));
  }

  formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};
  
    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });
  
    return convertedJSON;
  }
  async getObject(objects) {
    let url = " ";
    url += this.baseUrl + "/objects/";
    for (let i = 0; i < objects.length; i++) {
      let newUrl = " "
      newUrl = url + objects[i];
      fetch(newUrl)
      .then(response => {
        if (response.ok) {
          return response.json();         
        } else {
          throw Error(response.statusText);
        }
      })
      .then((response) => {
        console.log(response)
        this.displayImage(response)
      })
      .catch((error) => console.log("There was an error with this image!", error));
    }
  }
  displayImage(image) {
    var img = document.createElement("img");
    img.setAttribute("src", image.primaryImageSmall);
    img.setAttribute("alt", image.title);
    var h3 = document.createElement("p");
    h3.innerText = image.title;
    var li = document.createElement("li")
    li.appendChild(h3);
    li.appendChild(img);
    document.getElementById("output").appendChild(li);
  }
}