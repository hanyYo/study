class Blog {
  constructor() {
    const dataURL = './data/data.json';
    this.setInitData(dataURL);
  }
  setInitData(dataURL) {
    this.getData(dataURL, this.insertPosts);
  }

  getData(dataURL, fn) {
    const oReq = new XMLHttpRequest();

    oReq.addEventListener('load',function () {
      const list = JSON.parse(oReq.responseText);
      //console.log(list);
      fn(list.body);
    });

    oReq.open('GET', dataURL);
    oReq.send();
  }

  insertPosts(list) {
    const ul = document.querySelector('.blogList > ul');
    console.log(typeof list.body);
    list.forEach((v) => {
      ul.innerHTML += `<li><a href=${v.link}> ${v.title}</a></li>`;
    });

  }
}

export default Blog;
