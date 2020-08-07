const containerSuggestedList = document.querySelector('.listSuggestions');

let suggestedList = '';


export const iterateSuggestedArray = (suggestedWords) => {
    suggestedList = "";
    if (suggestedWords.length > 0) {
        suggestedWords.forEach((word) => {
            containerSuggestedList.innerHTML = allSuggestedWordsMarkup(word);
        });
    } else {
        containerSuggestedList.innerHTML = "";
    }

}

const allSuggestedWordsMarkup = (word) => {
    suggestedList += SuggestedWordsMarkup(word.name);
    return suggestedList;
}

const SuggestedWordsMarkup = (suggestedWord) => {
    return (`<li class="itemSuggestion"><i class="icon-icon-search subIcon"></i>
    <div class="boxSuggestion"><label for="" class="suggestion">${suggestedWord}</label></div>
    </li>`);
}