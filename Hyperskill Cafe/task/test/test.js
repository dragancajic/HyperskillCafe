const path = require('path');
const pagePath = 'file://' + path.resolve(__dirname, '../src/index.html');

const {StageTest, correct, wrong} = require('hs-test-web');

class CafeTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            // test #1
            let bodyNodes = Array.from(document.body.childNodes);
            this.innerBodyElements = bodyNodes.filter(
                e => e.nodeType === Node.ELEMENT_NODE);

            let len = this.innerBodyElements.length;
            const totalElements = 2;
            const errorMsg = `There should be ${totalElements} elements in the body of the HTML document, found: ${len}`;
            return len === totalElements ?
                correct() :
                wrong(errorMsg);
        }),
        this.page.execute(() => {
            // test #2
            const links = Array.from(document.head.querySelectorAll("link"));

            // if the link amount is not equal to 2
            let errorMsg = `There should be a link in the head of the HTML document, found: ${links.length}`;
            if (links.length < 1) return wrong(errorMsg);

            // check if href includes the substring for bootstrap link
            const linkBootstrap = "https://cdn.jsdelivr.net/npm/bootstrap@"
            const isBootstrapLinked = links.find(e => e.attributes
                .getNamedItem("href").value.includes(linkBootstrap));
            errorMsg = `Link the Bootstrap css with the HTML document in the head.`;
            if (!isBootstrapLinked) return wrong(errorMsg);

            // check if body contains the bootstrap script tag
            const bootstrapScript = document.body.querySelector("script")
            const bootstrapSrc = bootstrapScript && bootstrapScript.getAttribute("src");
            errorMsg = `Link the Bootstrap script with the HTML document in the body.`;
            if (!bootstrapScript || !bootstrapSrc ||  !bootstrapSrc.includes(linkBootstrap)) return wrong(errorMsg);

            return correct();

        }),
        this.page.execute(() => {
            // test #3
            // HEADER
            // check if header exist
            const header = document.body.querySelector("header");
            let errorMsg = "Header tag is missing in the body of the HTML document.";
            if (!header) return wrong(errorMsg);

            // NAV
            // check if nav exist
            const nav = document.body.querySelector("nav");
            errorMsg = "Nav tag is missing in the header.";
            if (!nav) return wrong(errorMsg);

            // check the classes of the nav
            const navClass = "navbar navbar-expand-lg navbar-light bg-light".split(" ");
            const navMissingClasses = navClass.filter(e => !nav.className.includes(e));
            errorMsg = `Nav tag is missing the correct Bootstrap class names: '${navMissingClasses}'`;
            if (navMissingClasses.length > 0) return wrong(errorMsg);

            // DIV
            // check if container div exist
            const div = nav.querySelector("div");
            errorMsg = "Nav tag is missing the inner wrapper container div tag.";
            if (!div) return wrong(errorMsg);

            // check if container div has the right class
            const divClass = "container-fluid"
            errorMsg = `Container nav tag is missing the right Bootstrap class: '${divClass}'`;
            if (!div.className.includes(divClass)) return wrong(errorMsg);

            // ANCHOR
            // check if navbar brand <a> exist
            const navBrand = div.querySelector("a");
            errorMsg = `Anchor tag is missing for navbar brand.`;
            if (!navBrand) return wrong(errorMsg);

            // check if <a> has the right class
            const navBrandClass = "navbar-brand";
            errorMsg = `Anchor tag is missing the right Bootstrap class for navbar brand: '${navBrandClass}'`;
            if (!navBrand.className.includes(navBrandClass)) return wrong(errorMsg);

            //check if <a> has the right link
            const homeLink = "#home";
            const navBrandHref = navBrand.getAttribute("href")
            errorMsg = `Anchor tag is missing the right href value for navbar brand. It should redirect to home.`;
            if (!navBrandHref || !navBrandHref.includes(homeLink)) return wrong(errorMsg);

            // check if <a> has the right text content
            const pageTitle = "Hyperskill Cafe";
            errorMsg = `Anchor tag is missing the right inner text for navbar brand: '${pageTitle}'`;
            if (!navBrand.innerText.includes(pageTitle)) return wrong(errorMsg);

            // BUTTON
            // check if navbar toggle button exist
            const navToggle = div.querySelector("button");
            errorMsg = "Button tag for toggling the navbar is missing in the container div tag.";
            if (!navToggle) return wrong(errorMsg);

            // check if toggle has the right class
            const navToggleClass = "navbar-toggler";
            errorMsg = `Button tag for toggling the navbar is missing the right Bootstrap class: '${navToggleClass}'`;
            if (!navToggle.className.includes(navToggleClass)) return wrong(errorMsg);

            // check if the toggle has the right type attr
            const navToggleType = navToggle.getAttribute("type");
            const type = "button";
            errorMsg = `Button tag for toggling the navbar is missing the right type attribute: ${navToggleType}`;
            if (!navToggleType || !navToggleType.includes(type)) return wrong(errorMsg);

            // check if the toggle has the right data-bs-toggle attr
            const navToggleData = navToggle.getAttribute("data-bs-toggle");
            const dataBsToggle = "collapse";
            errorMsg = `Button tag for toggling the navbar is missing the right data-bs-toggle attribute: ${dataBsToggle}`;
            if (!navToggleData || !navToggleData.includes(dataBsToggle)) return wrong(errorMsg);

            // check if the toggle has the right data-bs-target attr
            const navToggleDataTarget = navToggle.getAttribute("data-bs-target");
            const dataBsTarget = "#navbarSupportedContent";
            errorMsg = `Button tag for toggling the navbar is missing the right data-bs-target attribute: ${dataBsTarget}`;
            if (!navToggleDataTarget || !navToggleDataTarget.includes(dataBsTarget)) return wrong(errorMsg);

            // check if the toggle has the right aria-controls attr
            const navToggleAriaControls = navToggle.getAttribute("aria-controls");
            const ariaControls = "navbarSupportedContent";
            errorMsg = `Button tag for toggling the navbar is missing the right aria-control attribute: ${ariaControls}`;
            if (!navToggleAriaControls || !navToggleAriaControls.includes(ariaControls)) return wrong(errorMsg);

            // check if the toggle has the right aria-expanded attr
            const navToggleAriaExpanded = navToggle.getAttribute("aria-expanded");
            const ariaExpanded = "false";
            errorMsg = `Button tag for toggling the navbar is missing the right aria-expanded attribute: ${ariaExpanded}`;
            if (!navToggleAriaExpanded || !navToggleAriaExpanded.includes(ariaExpanded)) return wrong(errorMsg);

            // check if the toggle has the right aria-label attr
            const navToggleAriaLabel = navToggle.getAttribute("aria-label");
            const ariaLabel = "Toggle navigation";
            errorMsg = `Button tag for toggling the navbar is missing the right aria-label attribute: ${ariaLabel}`;
            if (!navToggleAriaLabel || !navToggleAriaLabel.includes(ariaLabel)) return wrong(errorMsg);

            // check if the toggle has the right inner span icon
            const spanIcon = navToggle.innerHTML.trim();
            const span = "<span class=\"navbar-toggler-icon\"></span>";
            errorMsg = `Button tag for toggling the navbar is missing the right inner span as the icon: ${span}`;
            if (!spanIcon.includes(span)) return wrong(errorMsg);

            // INNER WRAPPER DIV
            // check if inner div exist in container div
            const innerDiv = div.querySelector("div");
            errorMsg = `Div tag for wrapping the list of nav links is missing in the container div tag.`
            if (!innerDiv) return wrong(errorMsg);

            // check if inner div has the right class
            const innerDivClass = "collapse navbar-collapse".split(" ");
            const divMissingClasses = innerDivClass.filter(e => !innerDiv.className.includes(e));
            errorMsg = `Div tag for wrapping the list of nav links is missing the right Bootstrap classes: '${divMissingClasses}'`;
            if (divMissingClasses.length > 0) return wrong(errorMsg);

            // check if inner div has the right id
            const innerDivId = innerDiv.getAttribute("id");
            const id = "navbarSupportedContent";
            errorMsg = `Div tag for wrapping the list of nav links is missing the right id: ${id}`;
            if (!innerDivId || !innerDivId.includes(id)) return wrong(errorMsg);

            // UL LIST
            // check if ul list exist
            const ul = innerDiv.querySelector("ul");
            errorMsg = `Unordered list tag for wrapping the nav links is missing in the container div.`
            if (!ul) return wrong(errorMsg);

            // check if ul has the right class
            const ulClass = "navbar-nav ms-auto mb-2 mb-lg-0".split(" ");
            const ulMissingClasses = ulClass.filter(e => !ul.className.includes(e));
            errorMsg = `Unordered list tag for wrapping the nav links is missing the right Bootstrap class: '${ulMissingClasses}'`;
            if (ulMissingClasses.length > 0) return wrong(errorMsg);

            // LI LIST ITEM
            // check if 5 list item exist in ul
            const liArr = Array.from(ul.querySelectorAll("li"));
            errorMsg = `There should be 5 list item tags for each nav links, found: ${liArr.length}`;
            const liTotal = 5;
            if (liArr.length !== liTotal) return wrong(errorMsg);

            // check if all li has the right class
            const liClass = "nav-item";
            const liArrClass = liArr.filter(e => !e.className.includes(liClass))
            errorMsg = `All list item tags for each nav links should have the right Bootstrap class: '${liClass}'`;
            if (liArrClass.length > 0) return wrong(errorMsg);

            // HOME ANCHOR INSIDE LI
            // check if anchor exist for home in a li
            const aHome = liArr[0].querySelector("a");
            errorMsg = `First list item tag is missing the anchor tag.`;
            if (!aHome) return wrong(errorMsg);

            // check if the home anchor has the right class
            const aHomeClass = "nav-link active".split(" ");
            const aHomeMissingClasses = aHomeClass.filter(e => !aHome.className.includes(e));
            errorMsg = `First anchor tag for home is missing the right Bootstrap class: '${aHomeClass}'.`;
            if (aHomeMissingClasses.length > 0) return wrong(errorMsg);

            // check if the home anchor has the aria-current attr
            const ariaCurr = "page";
            const aHomeAria = aHome.getAttribute("aria-current");
            errorMsg = `First anchor tag for home is missing the right aria-current attribute: ${ariaCurr}.`;
            if (!aHomeAria || !aHomeAria.includes(ariaCurr)) return wrong(errorMsg);

            // check if the home anchor has the right href attr
            const homeHref = "#home";
            const aHomeHref = aHome.getAttribute("href");
            errorMsg = `First anchor tag for home is missing the right href attribute: ${homeHref}.`;
            if (!aHomeHref || !aHomeHref.includes(homeHref)) return wrong(errorMsg);

            // check if the home anchor has the right inner text
            const homeText = "Home";
            const aHomeText = aHome.innerText;
            errorMsg = `First anchor tag for home is missing the right inner text: ${homeText}.`;
            if (!aHomeText.includes(homeText)) return wrong(errorMsg);

            // REST OF THE ANCHORS IN LI
            // check if there are 4 additional anchors
            const links = liArr.filter(e => e.querySelector("a"));
            errorMsg = `There should be anchor tags inside each list item tags, found: ${links.length}.`;
            if (links.length !== liTotal) return wrong(errorMsg);

            // check if the rest of the anchors have the right class
            const aClass = "nav-link";
            const aClasses = liArr.filter(e => !e.querySelector("a").className.includes(aClass));
            errorMsg = `The anchor tags inside the list item tags should have the right Bootstrap class: '${aClass}'.`;
            if (aClasses.length > 0) return wrong(errorMsg);

            // ABOUT ANCHOR
            // check if about anchor has the right href
            const aAbout = liArr[1].querySelector("a")
            const aAboutHref = aAbout.getAttribute("href");
            const aboutHref = "#about";
            errorMsg = `The anchor tags for about should have the right href attribute: ${aboutHref}.`;
            if (!aAboutHref || !aAboutHref.includes(aboutHref)) return wrong(errorMsg);

            // check if about anchor has the right inner text
            const aboutText = "About";
            const aAboutText = aAbout.innerText;
            errorMsg = `The anchor tags for about should have the right inner text: ${aboutText}.`;
            if (!aAboutText.includes(aboutText)) return wrong(errorMsg);

            // PRODUCTS ANCHOR
            // check if products anchor the right href
            const aProducts = liArr[2].querySelector("a");
            const aProductsHref = aProducts.getAttribute("href");
            const productsHref = "#products";
            errorMsg = `The anchor tags for products should have the right href attribute: ${productsHref}.`;
            if (!aProductsHref || !aProductsHref.includes(productsHref)) return wrong(errorMsg);

            // check if products anchor has the right inner text
            const productsText = "Products";
            const aProductsText = aProducts.innerText;
            errorMsg = `The anchor tags for products should have the right inner text: ${productsText}.`;
            if (!aProductsText.includes(productsText)) return wrong(errorMsg);

            // REVIEWS ANCHOR
            // check if reviews anchor the right href
            const aReviews = liArr[3].querySelector("a");
            const aReviewsHref = aReviews.getAttribute("href");
            const reviewsHref = "#reviews";
            errorMsg = `The anchor tags for reviews should have the right href attribute: ${reviewsHref}.`;
            if (!aReviewsHref || !aReviewsHref.includes(reviewsHref)) return wrong(errorMsg);

            // check if reviews anchor has the right inner text
            const reviewsText = "Reviews";
            const aReviewsText = aReviews.innerText;
            errorMsg = `The anchor tags for reviews should have the right inner text: ${reviewsText}.`;
            if (!aReviewsText.includes(reviewsText)) return wrong(errorMsg);

            // CONTACT ANCHOR
            // check if contact anchor the right href
            const aContact = liArr[4].querySelector("a");
            const aContactHref = aContact.getAttribute("href");
            const contactHref = "#contact";
            errorMsg = `The anchor tags for contact should have the right href attribute: ${contactHref}.`;
            if (!aContactHref || !aContactHref.includes(contactHref)) return wrong(errorMsg);

            // check if contact anchor has the right inner text
            const contactText = "Contact";
            const aContactText = aContact.innerText;
            errorMsg = `The anchor tags for contact should have the right inner text: ${contactText}.`;
            if (!aContactText.includes(contactText)) return wrong(errorMsg);

            return correct();
        })
    ]
}

it('Test stage', async function () {
    try {
        this.timeout(30000)
    } catch (ignored) {
    }
    await new CafeTest().runTests()
}, 30000)