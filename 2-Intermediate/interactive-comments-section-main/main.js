import { addCommentReply, deleteComment, updateComment, fetchJsonToDB, getLocal, setLocal } from "./utils.js";

fetchJsonToDB();

const _mainContent = document.querySelector(".main-content");
const _overlay = document.querySelector(".overlay");
const _deleteForm = document.querySelector(".delete-form");

let openReplyComment = null; // currently opened reply comment
let replyingTo = null;
let toBeDeleted = null;

_mainContent.addEventListener("click", (e) => handleMainContentClick(e));
_overlay.addEventListener("click", toggleDeleteFormDisplay);
document.querySelector(".delete-cancel").addEventListener("click", toggleDeleteFormDisplay);
document.querySelector(".delete-confirm").addEventListener("click", handleDeleteComment);

function renderComments() {
    const data = getLocal("comments");
    const currUser = data.currentUser;
    // console.log(data);
    
    _mainContent.innerHTML = "";
    for(const comment of data.comments){
        renderCommentAndReplies(_mainContent, comment, currUser);
    }
    renderOneMyReply(_mainContent,null, currUser, 'send');
}
function renderCommentAndReplies(parentEl, comment, currUser) {
    const commentReplyCont = document.createElement("div");
    commentReplyCont.classList.add("comment-and-reply-container");
    parentEl.append(commentReplyCont);
    renderOneComment(commentReplyCont, comment, currUser);
    // console.log(comment.replies);
    
    if(comment.replies?.length > 0) {
        commentReplyCont.innerHTML += 
        `
        <div class="reply-container">
            <div class="left-bar">
                <div class="bar"></div>
            </div>
            <div class="right-bar"></div>
        </div>
        `
        const rightBar = commentReplyCont.querySelector(".right-bar");
        for(const reply of comment.replies)
            renderCommentAndReplies(rightBar,reply,currUser);
    }
}

function renderOneComment(parentEl, commentData, currUser) {    
    parentEl.innerHTML += 
    `
    <div class="comment" data-id="${commentData.id}">
        <div class="action-container">
            ${currUser.username !== commentData.user.username ?
                `<div class="reply-button-container">
                    <img src="./images/icon-reply.svg" alt="replay"/>
                    <p>Reply</p>
                </div>`
                :
                `<div class="delete-button-container">
                <img src="./images/icon-delete.svg" alt="replay"/>
                <p >Delete</p>
            </div>
            <div class="edit-button-container">
                <img src="./images/icon-edit.svg" alt="replay"/>
                <p>Edit</p>
            </div>`
            }
        </div>
        <div class="evaluate-container">
            <div class="evaluate">
                <img class="icon-plus" src="./images/icon-plus.svg" alt="icon-plus"/>
                <p class="evaluate-number">${commentData.score}</p>
                <img class="icon-minus" src="./images/icon-minus.svg" alt="icon-minus"/>
            </div>
        </div>
        <div class="comment-main-data">
            <div class="comment-header">
                <picture class="profile">
                    <source srcset="${commentData.user.image.webp}" type="image/webp">
                    <img src="${commentData.user.image.png}" alt="profile"/>
                </picture>
                <h1 id="acc-name">${commentData.user.username}</h1>
                ${currUser.username === commentData.user.username ? `<div class="you">you</div>` : ""}
                <p>${commentData.createdAt}</p>
            </div>
            <p class="comment-content">${
                commentData.replyingTo ? `<span class="hashtag">@${commentData.replyingTo + " "}</span>`
                : ""
            }${commentData.content}</p>
        </div>
    </div>
    `
}
function renderOneMyReply(parentEl, afterEl, currUser, msg) {
    const replyHTML =
    `
    <div class="my-reply-container comment ${!afterEl ? "active":""}">
        <picture class="profile comment-header">
            <source srcset="${currUser.image.webp}" type="image/webp">
            <img src="${currUser.image.png}" alt="profile"/>
        </picture>
        <div contenteditable="true" class="my-reply-text-input">${replyingTo ? `<span contenteditable="false" class="hashtag">@${replyingTo} </span>` : ""}</div>
        <div class="my-reply-button">${msg}</div>
    </div>
    `
    let replyCont;
    if(afterEl){
        afterEl.insertAdjacentHTML('afterend', replyHTML);
        replyCont = document.querySelector(".my-reply-container");
        replyCont.addEventListener("click", (e) => {
            handleReplySendClick(e, afterEl.dataset.id, currUser);
        });
    }
    else {
        parentEl.innerHTML += replyHTML;
        replyCont = document.querySelector(".my-reply-container");
        replyCont.addEventListener("click", (e) => {
            handleReplySendClick(e, null, currUser);
        });
    }
    setTimeout(() => {
        replyCont.classList.add(`show-slow`);
    }, 0.01);

    
}

function handleMainContentClick(e) {
    const data = getLocal("comments");
    const currUser = data.currentUser;
    
    if (e.target.closest("div.reply-button-container")) {
        const comment = e.target.closest(".comment");
        const commentReplyCont = comment.parentElement;
        
        if (openReplyComment && openReplyComment !== comment) {
            clearPreviousReply(openReplyComment);
        }

        if (openReplyComment === commentReplyCont) {            
            clearPreviousReply(comment);
            openReplyComment = null;
            replyingTo= null;
        } else {
            replyingTo = comment.querySelector("#acc-name").textContent;
            renderOneMyReply(commentReplyCont, comment ,currUser, "Reply");
            openReplyComment = commentReplyCont;
        }
    }
    else if(e.target.closest(".delete-button-container")) {
        toggleDeleteFormDisplay();
        toBeDeleted = e.target.closest(".comment").dataset.id;
    }
    else if(e.target.closest(".edit-button-container")) {
        const comment = e.target.closest(".comment")
        const commentText = comment.querySelector(".comment-content");
        console.log(commentText);
        commentText.setAttribute("contentEditable", true);
        commentText.focus();
        commentText.addEventListener("keydown", (e) => {
            if(e.key === "Enter") {
                e.preventDefault();
                handleTextDone();
            }
        });
        commentText.addEventListener("blur", handleTextDone());
        function handleTextDone() {
            commentText.setAttribute("contentEditable", false);
                let text = commentText.textContent.trim();
                let words = text.split(" ");
                if (words[0].startsWith("@"))
                    text = words.slice(1).join(" ");
                updateComment(comment.dataset.id, text);
        }
    }
    else if(e.target.matches(".icon-plus")) {        
        const comment = e.target.closest(".comment");
        const number = Number(comment.querySelector(".evaluate-number").textContent);
        updateComment(comment.dataset.id, null, number + 1);
        renderComments();
    }
    else if(e.target.matches(".icon-minus")) {
        const comment = e.target.closest(".comment");
        const number = Number(comment.querySelector(".evaluate-number").textContent);
        updateComment(comment.dataset.id, null, number - 1);
        renderComments();
    }
}
function clearPreviousReply(comment) {
    const replyElement = comment?.querySelector(".my-reply-container"); // Assuming replies have a class of 'my-reply'
    if (replyElement) replyElement.remove();
}
function toggleDeleteFormDisplay() {
    _deleteForm.classList.toggle("hidden");
    _overlay.classList.toggle("hidden");
}
function handleDeleteComment() {
    deleteComment(toBeDeleted);
    toBeDeleted = null;
    toggleDeleteFormDisplay();
    renderComments();
}

function handleReplySendClick(e, commentId, currUser) {
    if(e.target.matches(".my-reply-button")){
        const replyText = e.target.closest(".my-reply-container").querySelector(".my-reply-text-input").innerHTML;
        const parser = new DOMParser();
        const doc = parser.parseFromString(replyText, 'text/html');
        const elements = doc.body.childNodes;
        let text = "";
        elements.forEach(element => {            
            if(!(element.textContent[0] === '@'))
                text += element.textContent + " ";
        });
        addCommentReply(text, currUser, commentId, replyingTo);
        renderComments();
    }
}

renderComments();
