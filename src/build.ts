import fs from 'fs-extra';
import path from 'path';
import { createHash } from 'crypto'
const config = JSON.parse(fs.readFileSync('./src/configs.json', 'utf-8'));

const langs = config.langs;

function multiLang(lang: string, obj: any): string {
  // Return the value for the given language, or fallback to the default if not available.
  try {
    return obj[lang] || obj.default;
  } catch (e) {
    return obj.toString();
  }
}

/**
 * 用来创建element的工具函数
 * @param tag 标签名
 * @param attrs 属性数组
 * @param content 内容，可以是另一个element
 * @returns {string}  以字符串返回的element
 * @description 该函数会生成一个 HTML element。
 **/
function element(tag: string, attrs: string[], content: string): string {
  return `<${tag} ${attrs.join(" ")}>${content}</${tag}>`;
}

/**
 * 用来创建头element的工具函数
 * @param tag 标签名
 * @param attrs 属性数组
 * @returns {string}  以字符串返回的element
 * @description 该函数会生成一个不关闭的 HTML element。
 **/
function headElement(tag: string, attrs: string[]): string {
  return `<${tag} ${attrs.join(" ")}>`;
}

function composeFaviconGetterUri(target: string, size: string): string {
  const hashedTarget = createHash('md5').update(target).digest('hex');
  const url = `${config.faviconGetter}/sz/${size}/url/${encodeURIComponent(target)}/${hashedTarget}.webp`;
  return url;
}


function generateDynamicJS(): string {
  // const hitokotoJS = `<script src="https://v1.hitokoto.cn/?encode=js&amp;select=%23hitokoto" defer=""></script>`
  const searchEngineSwitchMenuJS =
    `<script defer="">
      var sengineLinks = document.querySelectorAll("#sengine button");
      sengineLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
          var activeLink = document.querySelector("#sengine button.active");
          if (activeLink) {
            activeLink.classList.remove("active");
          }
          link.classList.add("active");
          var searchFav = document.querySelector("#search-fav");
          var url = 'https://' + link.getAttribute("data-url").match(` + /^https?:\/\/(?:[^.]+\.)?([^.]+\.[a-z]{2,})/i + `)[1] || '';
          searchFav.setAttribute("src", "${config.faviconGetter}/sz/32/url/" + encodeURIComponent(url));
        });
      });

      var searchBtn = document.querySelector("#search");
      searchBtn.addEventListener("click", function (event) {
        var activeLink = document.querySelector("#sengine button.active");
        var url = activeLink.getAttribute("data-url");
        var searchInput = document.querySelector("#searchinput");
        url = url.replace(` + /\$s/ + `, searchInput.value);
        window.open(url);
      });
      var searchInput = document.querySelector("#searchinput");
      searchInput.addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
          searchBtn.click();
        }
      });
    </script>`;
  return searchEngineSwitchMenuJS;
}

/**
 * 生成 HTML 静态部分的函数
 * @returns {string}  以字符串返回的静态部分的页面
 **/
function generateStaticHTML(lang: string): string {
  return `
      <!DOCTYPE html>
      <html lang="${lang}">
        <head src="/dynamicHeads.html"></head>
        <body>
          <header></header>
          <main></main>
          <footer></footer>
          <script src="/dynamic.js"></script>
          <script src="/index.js"></script>
        </body>
      </html>
    `;
}

/**
 * 生成head的函数
 * @returns {string} 以字符串返回的head
 */
async function generateDynamicHead(): Promise<string> {
  const headList: string[] = [
    "<head>",
    headElement("meta", ['charset="UTF-8"']),
    headElement("meta", ['name="description" content="AHAI Navigation"']),
    headElement("meta", [
      'name="keywords" content="AHAI, AHAIGEGE, Navigation, AHAI Navigation"',
    ]),
    headElement("meta", [
      'name="viewport" content="width=device-width, initial-scale=1.0"',
    ]),
    headElement("meta", ['http-equiv="X-UA-Compatible" content="ie=edge"']),
    element("title", [], `${config.title} - ${config.subtitle}`),
    headElement("link", [
      'rel="apple-touch-icon"',
      'sizes="180x180"',
      'href="/apple-touch-icon.png"',
    ]),
    headElement("link", [
      'rel="icon"',
      'href="https://ysun.site/images/favicon.ico"',
    ]),
    headElement("link", ['rel="stylesheet"', 'href="/index.css"']),
    "</head>",
  ];
  const head: string = headList.join("\n");
  return head;
}

/**
 * 渲染第一个动态 div 的函数
 * @returns {string} 以字符串返回的第一个Div
 **/
function renderDynamicDiv1(lang: string): string {
  const item = (template: string, name: string) =>
    element("button", ['class="item"', `data-url="${template}"`], name);

  var headerHitoko = element(
    "div",
    ['class="hitoko"'],
    element(
      "p",
      [
        'id="hitokoto"',
        "onclick=\"location.href='https://hitokoto.cn';\"",
        'class="prevent-select"',
      ],
      "御剑于心，且听风吟。"
    ) + element(
      "script",
      [],
      `fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
      const hitokoto = document.querySelector('#hitokoto')
      hitokoto.onclick = function onclick(event) {location.href = 'https://hitokoto.cn/?uuid=' + data.uuid;}
      hitokoto.innerText = data.hitokoto
    })
    .catch(console.error)`
    )
  );

  var title = element(
    "h1",
    ['class="title-div prevent-select"'],
    element(
      "i",
      ['class="globe-icon"'],
      element(
        "svg",
        [
          'xmlns="http://www.w3.org/2000/svg"',
          'width="1em"',
          'height="1em"',
          'class="svg-icon"',
          'fill="currentColor"',
          'viewBox="0 0 16 16"',
        ],
        headElement("path", [
          'd="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"',
        ])
      )
    ) +
    element(
      "div",
      ['class="title"'],
      multiLang(lang, config.title) + element("div", ['class="sub-title"'], multiLang(lang, config.subtitle))
    )
  );

  var searchEngineInput = element(
    "div",
    ['class="search-engine-container"'],
    // element(
    //   "div",
    //   ['class="search-engine-top-left-icon-container prevent-select"'],
    //   ""
    // ) +
    element(
      "img",
      [
        'id="search-fav"',
        'class="search-engine-favicon-top-left-float"',
        `src="${composeFaviconGetterUri(`https://${config.search_engine[0].template.match(/^https?:\/\/(?:[^.]+\.)?([^.]+\.[a-z]{2,})/i)?.[1] || ""}`, "32")}"`,
        'alt="logo"',
      ],
      ""
    ) +
    element(
      "label",
      ['for="searchinput"'],
      "waht do you want to search"
    ) +
    element(
      "input",
      [
        'id="searchinput"',
        'name="searchinput"',
        'type="search"',
        'placeholder="Search"',
        'autocomplete="off"',
      ],
      ""
    ) +
    element(
      "i",
      ['id="search"', 'class="search-engine-button"'],
      element(
        "svg",
        [
          'xmlns="http://www.w3.org/2000/svg"',
          'width="1em"',
          'height="1em"',
          'fill="currentColor"',
          'viewBox="0 0 16 16"',
        ],
        headElement("path", [
          'd="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"',
        ])
      )
    )
  );

  var searchEngineSwitchMenu = element(
    "div",
    ['id="sengine"', 'class="search-engine-switch-menu prevent-select"'],
    config.search_engine
      .map((link: any, key: any) => {
        if (key == 0) {
          return element(
            "button",
            ['class="active item"', `data-url="${link.template}"`],
            multiLang(lang, link.name)
          );
        } else {
          return item(link.template, multiLang(lang, link.name));
        }
      })
      .join("")
  );

  return element(
    "header",
    ['class="header"'],
    (config.hitokoto ? headerHitoko : "") +
    element(
      "div",
      ['id="head"', 'class="head-container"'],
      multiLang(lang, title)
    )
  ) + element(
    "div",
    ['id="title"', 'class="search-engine-wrapper"'],
    (config.search ? searchEngineInput + searchEngineSwitchMenu : "")
  );
}

/**
 * 渲染第二个动态 div 的函数
 * @returns {string} 以字符串返回的第二个Div
 **/
function renderDynamicDiv2(lang: string): string {
  var main = config.quickLinkLists
    .map((item: any) => {
      const card = (
        url: string,
        name: string,
        desc: string,
        icon_size: string
      ) =>
        element(
          "a",
          ['class="card"', `href=${url}`, 'target="_blank"', 'rel="noreferrer noopener"'],
          element(
            "div",
            ['class="content"'],
            element(
              "img",
              [
                'class="card-favicon-top-left-float" alt="logo"',
                `src=${composeFaviconGetterUri(url, icon_size)}`
              ],
              ""
            ) +
            element("div", ['class="header"'], multiLang(lang, name)) +
            element("div", ['class="meta"'], multiLang(lang, desc))
          )
        );
      const divider = element(
        "h2",
        ['class="horizontal-divider"'],
        element("i", ['class="quicklink-icon"'], item.icon) + multiLang(lang, item.name)
      );

      var content = element(
        "div",
        ['class="four-stackable-cards"'],
        item.quickLinkList
          .map((link: any) => {
            return card(link.url, multiLang(lang, link.name), multiLang(lang, link.desc), link.icon_size);
          })
          .join("")
      );

      return element("div", ['class="quicklink"'], divider + content);
    })
    .join("");
  // const sellerDiv = config.selling_ads ? renderSeller() : "";
  //return element("main", [], element("div", ['class="ui container"'], main));
  return element(
    "div",
    ['class="scrollable"'],
    element(
      "main",
      ['class="main"'],
      element("div", ['class="quicklink-div"'], main)
    )
  );
}

/**
 * 渲染第三个动态 div 的函数
 * @returns {string} 以字符串返回的第三个Div，也就是footer
 **/
function renderDynamicDiv3(): string {
  return element(
    "footer",
    ['class="footer"'],
    element(
      "div",
      ['class="footer-div"'],
      "Powered by " +
      element(
        "a",
        [
          'class="label"',
          'href="https://github.com/AHA1GE/cf-pages-index"',
          'target="_blank"',
          'rel="noreferrer noopener"',
        ],
        element(
          "i",
          ['class="github-icon"'],
          element(
            "svg",
            [
              'xmlns="http://www.w3.org/2000/svg"',
              'width="1em"',
              'height="1em"',
              'fill="currentColor"',
              'viewBox="0 0 16 16"',
            ],
            headElement("path", [
              'd="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"',
            ])
          )
        ) + "&nbspCFPI"
      )
    )
  );
}

/**
 * 生成 HTML 页面的函数
 * @returns {string}  以字符串返回的页面
 * @description 该函数会生成一个 HTML 页面。
 **/
async function renderHTML(lang: string): Promise<string> {
  const staticHTML: string = generateStaticHTML(lang);
  const dynamicHead: string = await generateDynamicHead();
  const dynamicDiv1: string = renderDynamicDiv1(lang);
  const dynamicDiv2: string = renderDynamicDiv2(lang);
  const dynamicDiv3: string = renderDynamicDiv3();
  const dynamicJS: string = generateDynamicJS();
  let html = staticHTML
    .replace('<head src="/dynamicHeads.html"></head>', `${dynamicHead}`)
    .replace("<header></header>", `${dynamicDiv1}`)
    .replace("<main></main>", `${dynamicDiv2}`)
    .replace("<footer></footer>", `${dynamicDiv3}`)
    .replace('<script src="/dynamic.js"></script>', `${dynamicJS}`)
  html = html;
  return html;
}

async function buildLangs() {
  await fs.writeFile(path.join('public', 'index.html'), await renderHTML('en-us'), 'utf8'); // Build the default language first
  for (const lang of langs) {
    const publicDir = path.join('public');
    await fs.ensureDir(publicDir);
    const htmlContent = await renderHTML(lang);
    await fs.writeFile(path.join(publicDir, lang, 'index.html'), htmlContent, 'utf8');
  }
}

// Run the build process
buildLangs().catch(err => {
  console.error('Error during build multi-lang pages:', err);
});