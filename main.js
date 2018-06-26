class Blog {
  constructor() {
    this.dataURL = './data/data.json';
    this.setInitVariables();
    this.registerEvents();
    this.likedSet = new Set();
  }
  setInitVariables() {
    this.lstBlog = document.querySelector('.blogList > ul');
  }
  registerEvents() {
    const startBtn = document.querySelector('.start');

    startBtn.addEventListener('click', function () {
      this.setInitData(this.dataURL);
    }.bind(this));

    this.lstBlog.addEventListener('click', ({target}) => {
      const targetClassName = target.className;
      //className이 btn_mine이라면 내 찜 목록에 블로그제목을 추가한다.
      if(targetClassName !== 'btn_mine' && targetClassName !== 'btn_mine active') {
        return;
      }
      const postTitle = target.previousElementSibling.textContent;

      //찜취소를 클릭한 경우에, 찜하기로 다시 변경하고, 찜목록을 제거하고, 찜목록 뷰를 렌더링한다.
      if(targetClassName === 'btn_mine active') {
        target.className = 'btn_mine';
        target.innerText = '찜하기';
        this.likedSet.delete(postTitle);
      } else {
        //찜 된 목록의 클래스에 active 클래스 추가
        target.className = 'btn_mine active';
        target.innerText = '찜취소';
        //찜 목록에 추가
        this.likedSet.add(postTitle);
      }

      //내 찜 목록 뷰에 추가
      this.updateLikedList();
    });

  }

  updateLikedList() {
    const lstLike = document.querySelector('.like-list > ul');
    let likedSum = '';
    //li요소에 찜리스트를 넣고 한 번의 innerHTML 사용한다.
    this.likedSet.forEach((v) => {
      likedSum += `<li>${v}</li>`;
    });
    lstLike.innerHTML = likedSum;
  }

  setInitData(dataURL) {
    this.getData(dataURL, this.insertPosts.bind(this));
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

    list.forEach((v) => {
      this.lstBlog.innerHTML += `
        <li>
          <a href=${v.link}> ${v.title}</a>
          <button type="button" class="btn_mine">찜하기</button>
        </li>
        `;
    });

  }
}

export default Blog;
