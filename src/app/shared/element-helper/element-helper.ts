export function findElementByParent(elm: Element, parent: Element) {
  if (elm) {
    if (elm === parent) {
      return elm;
    } else {
      return elm.parentElement ? findElementByParent(elm.parentElement, parent) : null;
    }
  } else {
    return null;
  }
}

export function findElementByTagName(elm, tagName: string) {
  if (elm) {
    if (elm.tagName.toUpperCase() === tagName.toUpperCase()) {
      return elm;
    } else {
      return elm.parentElement ? findElementByTagName(elm.parentElement, tagName) : null;
    }
  } else {
    return null;
  }
}

export function findElementByClassName(elm, className: string) {
  if (elm) {
      if (elm.className.toUpperCase() === className.toUpperCase()) {
        return elm;
      } else {
        return elm.parentElement ? findElementByClassName(elm.parentElement, className) : null;
      }
  } else {
      return null;
  }
}

export function getAllPreviousSiblings(elm: Element): Array<any> {
    const list = new Array<Element>();

    return findRecursiveSiblings(elm, list);
}

function findRecursiveSiblings(elm: any, list: Array<any>): Array<any> {
    const previus = elm.previousSibling;

    if (previus != null) {
        list.push(previus);

        return findRecursiveSiblings(previus, list);
    }

    return list;
}

export function isLeftClickHounding(event: any) {

    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return false;
    } else if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return (event.button === 1 || event.type === 'click');
    }
}

export function isRigthClickHounding(event: MouseEvent) {
    return event.which === 2;
}

export function appendExistStyleAttribute(style: string, attributeName: string, attributeValue: string): string {
  let find = null;
  let index = -1;

  const array = formatStyle(style).split(' ');

  find = array.find((value) => {
      return value.includes(attributeName);
  });

  index = array.indexOf(find);

  if (index !== -1) {
    array[index] = setAttributeValue(attributeName, attributeValue);

    style = formatStyle(array.toString());
  } else {
    style += setAttributeValue(attributeName, attributeValue);
  }

  return style;
}

function formatStyle(style: string): string {
  style = style.replace(', ', ',').replace('),', ')');

  if (style.includes(', ') || style.includes('),')) {
      return formatStyle(style);
  }

  return style;
}

function setAttributeValue(attributeName: string, attributeValue: string): string {
  const result = ' {0}({1})';

  return result.replace('{0}', attributeName).replace('{1}', attributeValue);
}
