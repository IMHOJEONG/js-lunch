(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const Footer = () => {
  const render = () => {
    const html = (
      /* html */
      `made by hojeong`
    );
    const container = document.createElement("footer");
    container.innerHTML = html;
    return container;
  };
  return render();
};
const ASIAN_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH8SURBVHgB7ZW7LwRRFMbPegeFRqPwaBARNh4JoRBK1UY0eqvzH1BpUZIQpYJEKRJKj0REJJJVoyDitbHescc32YOb2b2zO7MzsyJ+yS9zs+4998z97lqif3yAmVthkH4DaKQbnsFb2EG5BA20wVP+wWish3IBNm6BN5zMue/xKTHp8C++FDHp8D4+i5h0eBdfBjHpcD8+zjwmHe7Fx/Zj0pF9fOw8Jh3O4+PsY9JhPz52LyYdmcfH7sekI3187F1MOvTxsfcx6UiOj/2LScd3fAUYFOHZBJdSHFwLDMk4AlfJGcOyh8EaPE4xJ4hejqyKGCfXp7zFIQyQTbAmDx4odfrJKVhcBe+kkPFsIJtgTTOMSY0rWGk1Py9NvUu4I+MKGCb7jMAyGe/Da8oGvFHIdPlqbKytho/K+iHKFuPewF2l6Ha6Y5d1FaZ1e07uoK54F4wqxTdho8X8OrgF4zL/HnaSm6DgOPxQmrqAM7AdlsBSGU9JA1+8wTFyG4luFD5w5rzAsGtRaZoakHsUt2jklRP3p9ezZkyNlcNBuAKfTSeyzIlvZiE5IN3/oZQEAoEYHhswCouVPxk/Q09wHXPeyS/w9sVwVoktbhrPG3PIL+SbpDawCBdMn02SX2CzehiRjefkxPLhtHx2AmvJT7BhDZxQo8G4SE6vkf4Kn2z8zgoShJFuAAAAAElFTkSuQmCC";
const CHINESE_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANvSURBVHgB7ZdbSBVBGMfnVHSziO4XKSKiGxFFdCGiICiJinqIeugCJWQWRNhj9VIEUQ9B0QUipCgSpKcisB4EH6KLiWL2YFZiaSqKmaaVl6/fx86hdd09Z48eDaI//Jjdne+b+XZ25ptZY/4rtiKmHxKRBRQpUBGJRJrN3xKBbIYS+aNfcA0y4QG8hXzYByPMQIoOtkOLhFMXXIehJtmi0RRYB02SmDphS9h+InGCGEKRBYdgrgk352rhGVTa+7n22WHmmZi+imBGwVXoCDkStXAEJkPE09Z477O+BLQVukMGUw5zTBI0LEbdfhP/E9VBCRznc3ywL6I+qy1dUAivqf9J3QSulQbuv5pEhHNRwGjoqL2EXTDFzrOoj36uHGh32etKewKP4Qt8g09wSsKmBAxT4XtAQHchxcdnJORKeOmLXQgTzBp4F9DILXFNTq6HwxLYAfck/JyLqhVWxApmDlQGOL+HGS7bVfACfkj/dCNWQBdjOJ72BF4jyZFm/WXRtr35ooxikU+s3bCElVFm7XIpdppg1UAeFEELTIN1sN44m7FXmkjTaL/VO0IVAW/xESZaG01y1QF29XASpnp75NlQWAvFAb4b1G6Ix6/UJ/om2EP0jfZe88hYHzv13YjdOajzVvJMc1I5NBp/LTU+b7EN2lxRaw5Jc9VH4Kz0Xk26EKZ57JbDeciGYzAbnkuw0v0Cmg/NLqP7MMzW6RK/JL33Ns1Xa11t6CfVFNDusWsPjkWqINUvoN0ew02uuhPin2duis1NlGPEyciJSNPJSuMncSZkVJrmJ7k68stPelJc7PI/I+Gl0+EyjDNBojLd5fAGRtvnC8X/lFjsspkBnyW8dGR7be7eVfYQquy1GkePnh3G2bm9qmb1tNlrzV+pJpx0FWbh2xkzIAzqKTKsg24T0eVdqZ37NOxOZBNMOOmpMZO+WkxYMZSzxNlG1rieHfUZ9gKxxw/KeeIcLeIpW/r6JyI9d/YMn8b1wD/T1utPQGGcYPQcFXYk4waXE9CJjuRwWx/r+PEKJptkicbyAjrSxJgfIxhNiLeTGowN6IokrgY4YAZCNLwYGhMI5pHY+TVgEufPNUzyewpjzWCIjqbDQQk+O+nvzgIz2BJnf7sjPXOPTuC9ph/q3++tE5gerPR4qhm4AErJwt3mX9FvD0G9XmKQoe0AAAAASUVORK5CYII=";
const JAPANESE_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKqSURBVHgB7ZZvaE1hHMefu1lsWXf+TCvbG8tImDdq3ohXpDCNIkpeeCO8Iyu0lRTygvxJypQyvKCUksS76dorGiKtmYVZ/s4uof18fp3n2rPj3nPv7k4mnW99Ouee8zu/53uf5/ec3zEmUqRI/6FEpAbOQpUZS2GgEo7DB/F0zIyFGHgy7IePMlxvYbr5W2KwYtgNr31GBuEOLIaY+0xsBPl1gDiHaqiFcvt8L3TAk1gsNmDjSjk0QCPMNEPj/IB2OAo3iU+afMQAE2EbPLb/TtL844ewA9bA/TQxT2ELFJnRiAST4J7kr+ewCSbkMt64LGbGc7gMdalL0ANt0GV/z7D3dQu7JdAJZ6CFpekzYQhDy2RoiQZgF5SkiSuzy/XFmZl6E7bE26opnXKur4JeeK/nzvXTTvy+gLwFUAcndQz3XuCSoQLnvJaHpzD97zhPwAHj7ZqEHWQahwVOfKHPhI5VCetgI9RAMfRx7wh5v5psIrDJV6AdsB2qoUgLFebATuj0xTbZHHFYC9chKem1OhczFXBD8tdVOAefM9zXmTkPK6AgyIj2m0Z4KeFLzd2GrZKtZRBQKt5r/o2Er2fQDLNMriL4oC+Jbvek5K9XcAIWSdCSBBiqgn6bTIt3PRySkUm7+S3x2sdU8TXOXPR727PttGaaOdWGd4Hfam52DjkG4QFcgVboBu1XcXKICUMYKYF6aA+YjRd2BufbZ/RlNw8OQ4/YbT9aI5pUa6kbfqYxoQXfCivFaxeFdqm1i7fJ8JrbY8IQiS75TGhx3xXv86PCxuhLcTm0yJ9fgapPsNCEIRIttSYewV6Y69xLLUmXZNZ32Cx5FHQmQ9oOdKuWOde0prRx9mcxkoAloZnJYrQcNsA18fqW1ss38T7ALkKDeN9PkSJF+qf1C2o4P+BuTa5lAAAAAElFTkSuQmCC";
const KOREAN_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGXSURBVHgB7ZeLcYMwDIZFJvAIZIJ2gzACG6QbtJ0g6QRJJygjtBM03SCdgGzQbKDKDckJgakMxpfc8d3pYqKHf4TBADBxYyTgCSIa+rkny8kWZCmZqdxHsj3ZN9kuSZJ3GAsrhGxF9oN6yionhZBQwUdPIW3ClhACKrTpmCjnZ2/HZFlH/AaGQAXeWs70QkeeM8fWhD60dKbA0zryFWSq3P6dooQHUWDdNllHfiPG1hA1n0ApJhVt3v43mUZQ9T/vlL1JDCgErVhSKZMGCjLiZNegEMQTltrJtDF4ujN1XRLBpe9k2hisP9My7puJWO78gPF4ZeOcO6SgOzYebx+ifY6NF84o0UrjiAlxyVK+jrgvkYUuDsJRbNQYp6CYcEFyDR0gPkd+cA2C9vxACvqC+NQeL3INpfRTQlzmtIQO54NahyrHDuJRcDF/GmRE5C7NpSC5hs5deobxeZFiOsHmW15IttAHm4jhKWAI2Hz17IvdJ3WvrQpRdjMccgk/MfTHIhPmS+YzR59ve68N2LXbu5jBxMQwfgGoHl7dVfk3jQAAAABJRU5ErkJggg==";
const WESTERN_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMVSURBVHgB7ZZNSFRRFMfPjIORfUkW0ndBiyKCKAqi6AsiIipoU5toEQSBtCx0EUVBBDUWaaYLjTApywqj6IsW7YKiRQuFAiUiKihRLCN1Tv/DO8Oc7lxl3sz4sfAPP+bNvffc+3/nvHvfI5rQhIiYeRV4BpbTWAsmNoPPHKgTLKGxEhZfA35ySr/BFhotYbGVoAUcB4VgGmhWM91guxkboZEWFrmpiydAtZqaCprA3qQJ/BaDRrCWRlJY4KSaSZqKgwIQNWPEzH0d8w1spHwKEy4Gm0BMF7/omKqVTOnYKHhsnqm/4CjlS5hsKfgOBsEVLVGhlivhKZ8YOq9tYqaM8ilMuIP/V6UxVeuYqtQMxtRUhX2wJVNgGeUiveNmzVBS18AkXfyCY6ouWT5nnnM6pp2zOTwRVKoP8HTNRoOTqSqTqSrH1FXzTEn/KdBnYmvCmpHnpk0nfw6KONg59Y6pS5qpQs2ar3zS12Ji3oCSMGbWg0/Owo/ALA6ejeHK5+6+Ok6dU7fBO8l8GDNzwHtO11ew2pSgwemvNpnylk9NhXvHIeC0x0wHWOGMK/aYihtT3t1HYaQTdTuLyJt7kRkzU7Mxm4Py3eX08sk8vvKVUxghYCun64npXwjeansrp3bfdSfG7j57eF6mMEJAmcdQFweH2Tbw2rT3yA1oXLHHVNyYOsZBCReENVTOmUnM7HJipXx32FM+ylYIPpGBmQGwz8REwAYOvol85ZNTPLtvIgSeycBQpxNzkIMTWL6lJ3N6+eQGdlM2QuC9DAzJAjs5OCTl3ZQwfQ85dXi2mnbZCFPCmikBHzkz9XNwUPZ7+ip0vrngi2lfF9bQIc5dL8EMM+ct03dkuPWjjpl5+DlLuekF2BOJRLpN2wdzXZqxISgO5lN26gP14ADM9Dp9g+a6IIyhFtBL4fQHyCm+H0YOgx+Ug2L2DyaTz4kBXN4Adjf8Aq/AU9ChJuRM6QLtiOuhPCnmNmBy2fIJXDaCItAKZMe0oY9phBXzNWLhB7ob5GuuBv8HaJQUG6oDJppoDBSlcaZxZ+gfa3lgNJSTvAIAAAAASUVORK5CYII=";
const ETC_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALdSURBVHgB7ZfPS1RRFMfPpEZSmpVoFrboB/0g3BSYtZHUCtrUpl2tWtQiCKGIltKynRUUZBD9AVG06ndIlrsQo8jIqMSSSjLzF3r6HO6bfI4z7z6dsdV84cObN+/ec8877957zhXJK6/slJB5SFVLuFTBVqiG0uDREHyGLviaSCSGZKGEE4tgD1yCHpjQzBqH19AGO62v5FIYbIIXMKXzUzs0SrbCSBlchGHNXiPQajZlPqLjWnigudfTOTtFh2J4qQunTliZbuxEGmfsv8twUjx+Qz90wHuYgk1QB6vFv4KvwQlWokaPotqgbpVEyeZDS7rQ818FnIc/Hhs2RqPPmSL1fypbacfFI9ocU/+q7IDCKCO71R+dLlgaw6Fl6vYr9USpNtwvdcNqgiLPWMMwJn5Zm2+eNjbWYYlwqEH82i4uXfi0EbbEaFeb8Qnh69N4sv2pOsJOFdyPaetLuG8ixdAIlyUSTx+gDe7AO3HR3gAH4LS45BtHoyz94lw4lCuN4dC/MVPn0E/5//oevkl16G3o97gsjGxXbw3d90iEQ52h35YS+iW3GoSDMl3QmR6FG6TOoV1cnonbH37BUXFL94e4PNUMmXfW2YPfgo9QDovhXnDfDpUwAfXMoedpLeBQobrtPKkb6pKtPSuAQ+rPUaZeqE9jf1FgMykr+qJfUGcmVytTz6Q8rwn2oQHohnOwDiphPxyBVRlsN+t06Wtj7BWfLCJwNfQWo3A2/CZBJMuhVGJIXdI+FdhK6koy+nEMrAjCmdQk3Ib1MkfRZxvc1ZmZ3wq04rkasnr6sc6Uhfl68FnLIvqW2OeAmzr7dPIQ1mTqm/A5xaUFrP4Jv9EkDMAr6BW3uZktK0stfWwGG7Qg1GdUXCV6gVU1KNkoiMgTnb+s6NsXe87EdMqW7A51h79ujT4o2jMrzuzYU6dzOChmc5SugBpxn2a5uKLfjs6f4A30wW9vEZ9XXjnWX/HsJCzK2xoUAAAAAElFTkSuQmCC";
const ADD_BUTTON_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC1SURBVHgB7dWBCcMgEAXQfyWDuEkzSjtZ7CZ2k25iTyjlKgim2pjQ/yAYiZ4HhxeAiIiomxijj31d0OiEndt9gmInWpJZB4d+gog8QANtVmKN7XSY3weLeKz1yzaT3u2H2pzYZg6DJR5lspPXrTtjndRKbibGUljnsrOWmnjINn3TZpYsRquPeMcqsQr6VN8ws8fyhXUO5k9SWJfOvmOEyDYzCBNsNSrB6ksyYTtBnyuI6M88ASAocaXv+pCsAAAAAElFTkSuQmCC";
const EATING_PLACE_TYPE = {
  ASIAN: {
    name: "아시안",
    image: ASIAN_IMG
  },
  CHINESE: {
    name: "중식",
    image: CHINESE_IMG
  },
  JAPANESE: {
    name: "일식",
    image: JAPANESE_IMG
  },
  KOREAN: {
    name: "한식",
    image: KOREAN_IMG
  },
  WESTERN: {
    name: "양식",
    image: WESTERN_IMG
  },
  ETC: {
    name: "기타",
    image: ETC_IMG
  },
  ALL: {
    name: "전체",
    image: ETC_IMG
  }
};
Object.values(EATING_PLACE_TYPE).map(
  (obj) => obj.name
);
const ICON_TYPE = {
  ADD_BUTTON_ICON
};
const EVENT_TYPE = {
  TO_LIST: "TO_LIST",
  TO_DRAWER: "TO_DRAWER",
  ADD_TO_LIST: "ADD_TO_LIST",
  SHOW_DETAIL: "SHOW_DETAIL"
};
const TIME_TO_GO = {
  FIVE: 5,
  TEN: 10,
  FIFTEEN: 15,
  TWENTY: 20,
  THIRTY: 30
};
const DrawerToggleButton = () => {
  const container = document.createDocumentFragment();
  const divElement = document.createElement("div");
  divElement.classList.add("drawer-button");
  const handleClick = (event) => {
    if (event.target && event.target.closest(".drawer-button")) {
      const isOpen = divElement.dataset.open;
      divElement.dataset.open = isOpen === "true" ? "false" : "true";
    }
  };
  const html = (
    /* html */
    `
      <img
        src=${ICON_TYPE.ADD_BUTTON_ICON}
        alt="header-drawer-img"/>
  `
  );
  divElement.innerHTML = html;
  divElement.addEventListener("click", handleClick);
  container.appendChild(divElement);
  return container;
};
const Header = () => {
  const container = document.createDocumentFragment();
  const header = document.createElement("header");
  const html = (
    /* html */
    `
    <div>
    점심 뭐먹지
    </div>
  `
  );
  header.innerHTML = html;
  const drawerToggleButton = DrawerToggleButton();
  header.appendChild(drawerToggleButton);
  container.appendChild(header);
  return container;
};
const EatingPlaceListItem = ({
  type,
  imageType,
  title,
  timeToGo,
  description,
  referenceLink
}) => {
  const divElement = document.createElement("div");
  divElement.classList.add("eating-place-list-item");
  const handleClick = () => {
    const eatingPlaceDetailDrawer = document.querySelector(
      ".eating-place-detail-drawer"
    );
    divElement.dataset.open = "true";
    eatingPlaceDetailDrawer.dataset.item = JSON.stringify({
      type,
      title,
      timeToGo,
      description,
      referenceLink
    });
  };
  const html = (
    /* html */
    `
      <img src=${imageType} alt="eating-place-list-item-img" />
      <div class="eating-place-list-item-box" data-type=${type} data-reference-link=${referenceLink}>
        <div>
          <div class="eating-place-list-item-box-title">${title}</div>
          <div class="time-to-go-label">${timeToGo}</div>
        </div>
        <div class="description">${description}</div>
      </div>
    `
  );
  divElement.innerHTML = html;
  divElement.addEventListener("click", handleClick);
  return divElement;
};
const eatingPlaceListData = [
  {
    type: EATING_PLACE_TYPE.CHINESE.name,
    imageType: EATING_PLACE_TYPE.CHINESE.image,
    title: "현지 느낌 그대로 중식당",
    timeToGo: "2분 내 도착 가능",
    description: "풍미 가득한 정통 중화요리와 시그니처 요리를 경험하세요",
    referenceLink: ""
  },
  {
    type: EATING_PLACE_TYPE.JAPANESE.name,
    imageType: EATING_PLACE_TYPE.JAPANESE.image,
    title: "신선한 초밥과 일식 요리",
    timeToGo: "4분이면 도착!",
    description: "싱싱한 해산물과 정성 가득한 일본 요리를 제공합니다",
    referenceLink: ""
  },
  {
    type: EATING_PLACE_TYPE.ETC.name,
    imageType: EATING_PLACE_TYPE.ETC.image,
    title: "색다른 미식 탐험",
    timeToGo: "3분 거리",
    description: "이국적인 메뉴와 독창적인 맛을 즐길 수 있는 곳",
    referenceLink: ""
  },
  {
    type: EATING_PLACE_TYPE.ASIAN.name,
    imageType: EATING_PLACE_TYPE.ASIAN.image,
    title: "정통 아시아의 맛",
    timeToGo: "도보 1분 거리",
    description: "고급 양갈비와 다채로운 아시아 요리를 한자리에서",
    referenceLink: ""
  },
  {
    type: EATING_PLACE_TYPE.KOREAN.name,
    imageType: EATING_PLACE_TYPE.KOREAN.image,
    title: "정통 한식 맛집",
    timeToGo: "5분 거리",
    description: "직접 담근 김치와 깊은 맛의 한식 요리를 맛볼 수 있는 곳",
    referenceLink: ""
  },
  {
    type: EATING_PLACE_TYPE.WESTERN.name,
    imageType: EATING_PLACE_TYPE.WESTERN.image,
    title: "분위기 좋은 서양식 레스토랑",
    timeToGo: "10분 걸려요",
    description: "스테이크부터 파스타까지, 품격 있는 서양 요리를 만나보세요",
    referenceLink: ""
  }
];
const toggleElement = (element) => {
  const isOpen = element.dataset.open;
  element.dataset.open = isOpen === "true" ? "false" : "true";
};
const clearInputData = (elements) => {
  elements.forEach((element) => {
    element.value = "";
  });
};
const INPUT_FIELDS_VALIDATION_RANGE = {
  START: 0,
  END: 3
};
const checkValidationInputFields = (data) => data.slice(
  INPUT_FIELDS_VALIDATION_RANGE.START,
  INPUT_FIELDS_VALIDATION_RANGE.END
).every((value) => value !== "");
const LOCAL_STORAGE_KEY = "eatingPlaceList";
const makeEatingPlaceList = (data) => {
  const newData = [...data];
  const imageType = Object.values(EATING_PLACE_TYPE).filter((value) => value.name === newData.at(0)).map((value) => value.image)[0];
  const newPlaceLists = [
    ...eatingPlaceListData,
    {
      type: newData.at(0),
      imageType,
      title: newData.at(1),
      timeToGo: newData.at(2),
      description: newData.at(3),
      referenceLink: newData.at(4)
    }
  ];
  return JSON.stringify(newPlaceLists);
};
const filterEatingPlaceList = ({
  filterState = "",
  radioState = ""
}) => {
  const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const data = JSON.parse(localStorageData) || eatingPlaceListData;
  return data.filter((data1) => {
    if (filterState === "전체" || filterState === "") return true;
    return filterState === data1.type;
  }).sort((data1, data2) => {
    if (radioState === "name") {
      return data1.title.localeCompare(data2.title, "ko");
    }
    if (radioState === "distance") {
      const data1Number = Number(data1.timeToGo.replace(/\D/g, ""));
      const data2Number = Number(data2.timeToGo.replace(/\D/g, ""));
      return data1Number - data2Number;
    }
    return 1;
  }).map((data1) => {
    const { type, imageType, title, timeToGo, description, referenceLink } = data1;
    return EatingPlaceListItem({
      type,
      imageType,
      title,
      timeToGo,
      description,
      referenceLink
    });
  });
};
const makeEatingDetailInfo = ({
  type,
  title,
  timeToGo,
  description,
  referenceLink
}) => (
  /* html */
  `
  <h3>${title}</h3>
  <div class="type">${type}</div>
  <div class="timeToGo">${timeToGo}</div>
  <div class="description">${description}</div>
  <div class="referenceLink">${referenceLink}</div>
`
);
const EatingPlaceList = () => {
  const container = document.createDocumentFragment();
  const divElement = document.createElement("div");
  divElement.classList.add("eating-place-list");
  divElement.innerHTML = "";
  const items = filterEatingPlaceList({});
  items.forEach((item) => {
    divElement.appendChild(item);
  });
  container.appendChild(divElement);
  return container;
};
const EatingPlaceRadioGroup = () => {
  const container = document.createDocumentFragment();
  const divElement = document.createElement("div");
  divElement.classList.add("eating-place-radio-group");
  const handleClick = (event) => {
    if (event.target && event.target.closest(".name")) {
      divElement.dataset.radio = "name";
    }
    if (event.target && event.target.closest(".distance")) {
      divElement.dataset.radio = "distance";
    }
  };
  const html = (
    /* html */
    `
    <div class="name">
      <input type="radio" id="name" name="criteria" value="name" 
      ${divElement.classList.contains("name") ? "checked" : ""} />
      <label for="name">이름순</label>
    </div>

    <div class="distance">
      <input type="radio" id="distance" name="criteria" value="distance"
      ${divElement.classList.contains("distance") ? "checked" : ""} />
      <label for="distance">거리순</label>
    </div>
  `
  );
  divElement.innerHTML = html;
  divElement.addEventListener("click", handleClick);
  container.appendChild(divElement);
  return container;
};
const EatingPlaceSelect = ({ className = "eating-place-select" }) => {
  const container = document.createDocumentFragment();
  const selectElement = document.createElement("select");
  selectElement.classList.add(className);
  const handleChange = (event) => {
    if (event.target && event.target.closest(".eating-place-select")) {
      selectElement.dataset.select = event.target.value;
    }
  };
  const html = (
    /* html */
    `
      <option value=${EATING_PLACE_TYPE.ALL.name}>먹고 싶은 음식을 골라줘</option>
      <option value=${EATING_PLACE_TYPE.ALL.name}>전체</option>
      <option value=${EATING_PLACE_TYPE.KOREAN.name}>한식</option>
      <option value=${EATING_PLACE_TYPE.CHINESE.name}>중식</option>
      <option value=${EATING_PLACE_TYPE.JAPANESE.name}>일식</option>
      <option value=${EATING_PLACE_TYPE.WESTERN.name}>양식</option>
      <option value=${EATING_PLACE_TYPE.ASIAN.name}>아시안</option>
      <option value=${EATING_PLACE_TYPE.ETC.name}>기타</option>
    `
  );
  selectElement.innerHTML = html;
  selectElement.addEventListener("change", handleChange);
  container.appendChild(selectElement);
  return container;
};
const Main = () => {
  const container = document.createElement("main");
  const render = () => {
    const html = (
      /* html */
      `
        <section class="eating-place-top-section" >
        </section>
    
        <section class="eating-place-bottom-section">
        </section>
    `
    );
    container.innerHTML = html;
    const topSection = container.querySelector(".eating-place-top-section");
    topSection.appendChild(
      EatingPlaceSelect({ className: "eating-place-select" })
    );
    topSection.appendChild(EatingPlaceRadioGroup());
    const bottomSection = container.querySelector(
      ".eating-place-bottom-section"
    );
    bottomSection.appendChild(EatingPlaceList());
    return container;
  };
  render();
  return container;
};
const ERROR_MESSAGE = {
  NOT_ENOUGH_DATA_INPUT: "충분히 데이터가 입력되지 않았습니다."
};
const MESSAGE = {
  DATA_INPUT_OK: "데이터가 추가되었습니다."
};
const addEvent = () => {
  const eatingPlaceList = document.querySelector(".eating-place-list");
  eatingPlaceList.addEventListener(EVENT_TYPE.TO_LIST, () => {
    const radioElement = document.querySelector(".eating-place-radio-group");
    const radioValue = radioElement.dataset.radio;
    const selectElement = document.querySelector(".eating-place-select");
    const selectValue = selectElement.dataset.select;
    eatingPlaceList.innerHTML = "";
    const items = filterEatingPlaceList({
      filterState: selectValue,
      radioState: radioValue
    });
    items.forEach((item) => {
      eatingPlaceList.appendChild(item);
    });
  });
  eatingPlaceList.addEventListener(EVENT_TYPE.ADD_TO_LIST, () => {
    const drawerElement = document.querySelector(".eating-place-drawer");
    const drawerValue = drawerElement.dataset.result;
    const data = drawerValue.split(",");
    const isInputValid = checkValidationInputFields(data);
    if (isInputValid) {
      localStorage.setItem(LOCAL_STORAGE_KEY, makeEatingPlaceList(data));
      eatingPlaceList.innerHTML = "";
      const items = filterEatingPlaceList({});
      items.forEach((item) => {
        eatingPlaceList.appendChild(item);
      });
      alert(MESSAGE.DATA_INPUT_OK);
    } else {
      alert(ERROR_MESSAGE.NOT_ENOUGH_DATA_INPUT);
    }
  });
  const eatingPlaceDrawer = document.querySelector(".eating-place-drawer");
  eatingPlaceDrawer.addEventListener(EVENT_TYPE.TO_DRAWER, () => {
    toggleElement(eatingPlaceDrawer);
    const inputDataArray = eatingPlaceDrawer.querySelectorAll(
      ".eating-place-drawer-content .data"
    );
    clearInputData(inputDataArray);
  });
  const eatingPlaceDetailDrawer = document.querySelector(
    ".eating-place-detail-drawer"
  );
  eatingPlaceDetailDrawer.addEventListener(EVENT_TYPE.SHOW_DETAIL, () => {
    eatingPlaceDetailDrawer.dataset.open = "true";
    const eatingDetailItem = eatingPlaceDetailDrawer.dataset.item;
    const eatingPlaceDetailDrawerContent = document.querySelector(
      ".eating-place-detail-drawer .eating-place-drawer-content"
    );
    eatingPlaceDetailDrawerContent.innerHTML = makeEatingDetailInfo(
      JSON.parse(eatingDetailItem)
    );
  });
};
const createObserver = ({
  publishers,
  subscribers,
  event,
  attributeName = [""]
}) => {
  const publisherElements = publishers;
  const subscriberElements = subscribers;
  const config = { attributes: true, childList: true, subtree: true };
  const callback = (mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes" && attributeName.includes(mutation.attributeName)) {
        subscriberElements.forEach((subscriberElement) => {
          const customEvent = new CustomEvent(event);
          subscriberElement.dispatchEvent(customEvent);
        });
      }
    }
  };
  const observer = new MutationObserver(callback);
  publisherElements.forEach((publisherElement) => {
    observer.observe(publisherElement, config);
  });
};
const addObserver = () => {
  createObserver({
    publishers: document.querySelectorAll(".eating-place-drawer"),
    subscribers: [document.querySelector(".eating-place-list")],
    event: EVENT_TYPE.ADD_TO_LIST,
    attributeName: ["data-result"]
  });
  createObserver({
    publishers: document.querySelectorAll(".drawer-button"),
    subscribers: [document.querySelector(".eating-place-drawer")],
    event: EVENT_TYPE.TO_DRAWER,
    attributeName: ["data-open"]
  });
  createObserver({
    publishers: document.querySelectorAll(".eating-place-radio-group"),
    subscribers: [document.querySelector(".eating-place-list")],
    event: EVENT_TYPE.TO_LIST,
    attributeName: ["data-radio"]
  });
  createObserver({
    publishers: document.querySelectorAll(".eating-place-select"),
    subscribers: [document.querySelector(".eating-place-list")],
    event: EVENT_TYPE.TO_LIST,
    attributeName: ["data-select"]
  });
  createObserver({
    publishers: document.querySelectorAll(".eating-place-list-item"),
    subscribers: [document.querySelector(".eating-place-detail-drawer")],
    event: EVENT_TYPE.SHOW_DETAIL,
    attributeName: ["data-open"]
  });
};
const Input = ({
  name,
  className,
  placeholder = "",
  required = false
}) => (
  /* html */
  `<input class='${className}' name=${name}
required=${required}
placeholder="${placeholder}" 
/>`
);
const Label = ({ name, htmlFor, className }) => (
  /* html */
  `<label for=${htmlFor} class=${className}>${name}</label>`
);
const Select = ({ className, children }) => (
  /* html */
  `<Select class='${className}'>${children}</Select>`
);
const EatingPlaceDrawer = () => {
  const container = document.createDocumentFragment();
  const divElement = document.createElement("div");
  divElement.classList.add("eating-place-drawer");
  const handleClick = () => {
    const inputDataArray = divElement.querySelectorAll(
      ".eating-place-drawer-content .data"
    );
    const results = [...inputDataArray].map((data) => data.value);
    divElement.dataset.result = results;
    divElement.dataset.open = false;
  };
  const html = (
    /* html */
    `
      <div class="eating-place-drawer-backdrop"></div>
      <div class="eating-place-drawer-content" data-result=''>
        <h3>새로운 음식점</h3>
        <div class="category-box">
          ${Label({
      name: "카테고리",
      htmlFor: "카테고리",
      className: "category required"
    })}
          ${Select({
      className: "category data",
      children: `
                <option value=${EATING_PLACE_TYPE.KOREAN.name}>한식</option>
                <option value=${EATING_PLACE_TYPE.CHINESE.name}>중식</option>
                <option value=${EATING_PLACE_TYPE.JAPANESE.name}>일식</option>
                <option value=${EATING_PLACE_TYPE.WESTERN.name}>양식</option>
                <option value=${EATING_PLACE_TYPE.ASIAN.name}>아시안</option>
              `
    })}
        </div>
        <div class="name-box">
          ${Label({ name: "이름", htmlFor: "이름", className: "name required" })}
          ${Input({
      name: "이름",
      className: "name data",
      placeholder: "이름을 입력해주세요"
    })}
        </div>
      
        <div class="distance-box">
          ${Label({
      name: "거리(도보 이동 시간)",
      htmlFor: "거리(도보 이동 시간)",
      className: "distance required"
    })}
          ${Select({
      className: "distance data",
      children: `
                <option value=${TIME_TO_GO.FIVE}>5분</option>
                <option value=${TIME_TO_GO.TEN}>10분</option>
                <option value=${TIME_TO_GO.FIFTEEN}>15분</option>
                <option value=${TIME_TO_GO.TWENTY}>20분</option>
                <option value=${TIME_TO_GO.THIRTY}>30분</option>
              `
    })}
        </div>
        <div class="description-box">
          ${Label({ name: "설명", htmlFor: "설명" })}
          ${Input({ name: "설명", className: "description data", required: true })}
          ${Label({ name: "메뉴 등 추가 정보를 입력해 주세요.", htmlFor: "설명" })}
        </div>
        <div class="reference-box">
          ${Label({ name: "참고 링크", htmlFor: "참고 링크" })}
          ${Input({ name: "참고 링크", className: "reference data" })}
          ${Label({ name: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.", htmlFor: "참고 링크" })}
        </div>

        <button class="eating-place-drawer-submit-button">
          확인
        </button>
      </div>
    `
  );
  divElement.innerHTML = html;
  container.appendChild(divElement);
  const button = container.querySelector(".eating-place-drawer-submit-button");
  button.addEventListener("click", handleClick);
  return container;
};
const EatingPlaceDetailDrawer = () => {
  const container = document.createDocumentFragment();
  const divElement = document.createElement("div");
  divElement.classList.add("eating-place-detail-drawer");
  const handleDelete = () => {
    toggleElement(divElement);
  };
  const handleClose = () => {
    toggleElement(divElement);
  };
  const html = (
    /* html */
    `
       <div class="eating-place-drawer-backdrop"></div>
       <div class="eating-place-drawer-content">
        ${makeEatingDetailInfo({})}
      </div>
        <div>
          <button class="remove">
            삭제하기
          </button>                 
          <button class="close">
            닫기
          </button>
        </div>
     `
  );
  divElement.innerHTML = html;
  container.appendChild(divElement);
  const deleteButton = container.querySelector(
    ".eating-place-detail-drawer .remove"
  );
  deleteButton.addEventListener("click", handleDelete);
  const closeButton = container.querySelector(
    ".eating-place-detail-drawer .close"
  );
  closeButton.addEventListener("click", handleClose);
  return container;
};
window.addEventListener("load", () => {
  const app = document.querySelector("#app");
  const header = Header();
  const main = Main();
  const footer = Footer();
  const drawer = EatingPlaceDrawer();
  const detailDrawer = EatingPlaceDetailDrawer();
  app.appendChild(header);
  app.appendChild(main);
  app.appendChild(footer);
  app.appendChild(drawer);
  app.appendChild(detailDrawer);
  addObserver();
  addEvent();
});
