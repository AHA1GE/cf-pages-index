import fs from 'fs-extra';
import path from 'path';
import config from './configs.js';

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

/**
 * 生成 HTML 静态部分的函数
 * @returns {string}  以字符串返回的静态部分的页面
 **/
function generateStaticHTML(): string {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head src="/dynamicHeads.html"></head>
        <body>
          <header></header>
          <main></main>
          <footer></footer>
          <script src="/index.js"></script>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5526526482489599" crossorigin="anonymous"></script>
        </body>
        <style src="/index.css"></style>
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
function renderDynamicDiv1(): string {
  const item = (template: string, name: string) =>
    element("a", ['class="item"', `data-url="${template}"`], name);

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
    )
  );

  var title = element(
    "h1",
    ['class="title-div prevent-select"'],
    element(
      "i",
      ['class="globe-icon"', 'style="width: 1em;  height: 1em;"'],
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
      config.title + element("div", ['class="sub-title"'], config.subtitle)
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
        `src="${config.faviconGetter}https://${config.search_engine[0].template.match(
          /^https?:\/\/(?:[^.]+\.)?([^.]+\.[a-z]{2,})/i
        )?.[1] || ""
        }"`,
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
    ['id="sengine"', 'class="search-engine-switch-menu"'],
    config.search_engine
      .map((link, key) => {
        if (key == 0) {
          return element(
            "a",
            ['class="active item"', `data-url="${link.template}"`],
            link.name
          );
        } else {
          return item(link.template, link.name);
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
      title
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
function renderDynamicDiv2(): string {
  var main = config.quickLinkLists
    .map((item) => {
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
                `src="${config.faviconGetter}https://${url.match(/^https?:\/\/([a-z0-9.-]+\.[a-z]{2,})/i)?.[1] || ""
                }&sz=${icon_size}"`,
              ],
              ""
            ) +
            element("div", ['class="header"'], name) +
            element("div", ['class="meta"'], desc)
          )
        );
      const divider = element(
        "h2",
        ['class="horizontal-divider"'],
        element("i", ['class="quicklink-icon"'], item.icon) + item.name
      );

      var content = element(
        "div",
        ['class="four-stackable-cards"'],
        item.quickLinkList
          .map((link) => {
            return card(link.url, link.name, link.desc, link.icon_size);
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
      "Powered by" +
      element(
        "a",
        [
          'class="label"',
          'href="https://github.com/AHA1GE/cf-worker-dir-remasterd"',
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
        ) + "&nbspCWD-re"
      ) +
      "&nbsp&nbsp © Based on" +
      element(
        "a",
        [
          'class="label"',
          'href="https://github.com/AHA1GE/cf-worker-dir-remasterd"',
          'target="_blank"',
          'rel="noreferrer noopener"',
        ],
        element(
          "i",
          ['class="mit-icon"'],
          element(
            "svg",
            [
              'xmlns="http://www.w3.org/2000/svg"',
              'width="1em"',
              'height="1em"',
              'fill="currentColor"',
              'viewBox="0 0 640 512"',
            ],
            headElement("path", [
              'd="M384 32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H398.4c-5.2 25.8-22.9 47.1-46.4 57.3V448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 128c-17.7 0-32-14.3-32-32s14.3-32 32-32H288V153.3c-23.5-10.3-41.2-31.6-46.4-57.3H128c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288H584.4L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320H199.3L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z"',
            ])
          )
        ) + "&nbspMIT License"
      )
    )
  );
}

/**
 * 生成 HTML 页面的函数
 * @returns {string}  以字符串返回的页面
 * @description 该函数会生成一个 HTML 页面。
 **/
async function renderHTML(): Promise<string> {
  const staticHTML: string = generateStaticHTML();
  const dynamicHead: string = await generateDynamicHead();
  const dynamicDiv1: string = renderDynamicDiv1();
  const dynamicDiv2: string = renderDynamicDiv2();
  const dynamicDiv3: string = renderDynamicDiv3();
  let html = staticHTML
    .replace('<head src="/dynamicHeads.html"></head>', `${dynamicHead}`)
    .replace("<header></header>", `${dynamicDiv1}`)
    .replace("<main></main>", `${dynamicDiv2}`)
    .replace("<footer></footer>", `${dynamicDiv3}`)
  html = html;
  return html;
}

// Ensure the public directory exists and write the HTML file
async function build() {
  const publicDir = path.join('public');
  await fs.ensureDir(publicDir);

  const htmlContent = await renderHTML();
  await fs.writeFile(path.join(publicDir, 'index.html'), htmlContent, 'utf8');

  console.log('Static HTML generated successfully.');
}

// Run the build process
build().catch(err => {
  console.error('Error during build process:', err);
});