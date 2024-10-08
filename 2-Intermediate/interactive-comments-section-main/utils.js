function fetchJsonToDB() {
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        data["currId"] = 5;
        if(!getLocal("comments"))
            setLocal("comments", data);
    })
    .catch(error => console.error('Error loading JSON:', error));
}

const getLocal = (key) => JSON.parse(localStorage.getItem(key));
const setLocal = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const clearStorage = () => localStorage.clear();
// clearStorage();

function addCommentReply(content, user, targetId, replyingTo) {
    let data = getLocal("comments");
    const replyData = {
        id: data.currId,
        content,
        createdAt: "Just Now",
        replies: [],
        score: 0,
        user,
    }
    data.currId += 1;
    if(replyingTo) replyData["replyingTo"] = replyingTo;

    const comments = data.comments;    
    if(!targetId) {
        comments.push(replyData);
    }
    else {
        const [commentIdx, reply1Idx] = findCommentOrReplyIndex(comments, Number(targetId));
        
        if(commentIdx?.toString() && reply1Idx?.toString())
            comments[commentIdx].replies[reply1Idx].replies.unshift(replyData);
        else if(commentIdx?.toString())
            comments[commentIdx].replies.unshift(replyData);
    }
    setLocal("comments", data);
}
function deleteComment(targetId) {
    let data = getLocal("comments");
    const comments = data.comments;

    const [commentIdx, reply1Idx, reply2Idx] = findCommentOrReplyIndex(comments, Number(targetId));
    
    if(reply2Idx?.toString())
        comments[commentIdx].replies[reply1Idx].replies.splice(reply2Idx, 1);
    else if(commentIdx?.toString() && reply1Idx?.toString())
        comments[commentIdx].replies.splice(reply1Idx, 1); 
    else if (commentIdx?.toString())
        comments.splice(commentIdx, 1);

    data.currId -= 1;

    setLocal("comments", data);
}
function updateComment(targetId, newContent, newScore) {
    let data = getLocal("comments");
    const comments = data.comments;
    
    const [commentIdx, reply1Idx, reply2Idx] = findCommentOrReplyIndex(comments, Number(targetId));
    
    if(reply2Idx?.toString()){
        if(newContent) comments[commentIdx].replies[reply1Idx].replies[reply2Idx].content = newContent;
        if(newScore?.toString()) comments[commentIdx].replies[reply1Idx].replies[reply2Idx].score = newScore;
    }
    else if (commentIdx?.toString() && reply1Idx?.toString()) {
        if(newContent) comments[commentIdx].replies[reply1Idx].content = newContent;
        if(newScore?.toString()) comments[commentIdx].replies[reply1Idx].score = newScore;
    }
    else if (commentIdx?.toString()) {
        if(newContent) comments[commentIdx].content = newContent;
        if(newScore?.toString()) comments[commentIdx].score = newScore;
    }
    
    setLocal("comments", data);
}
function findCommentOrReplyIndex(comments, targetId) {
    for (let commentIndex = 0; commentIndex < comments.length; commentIndex++) {
        const comment = comments[commentIndex];
        
        if (comment.id === targetId)
        return [commentIndex, null, null];

        if (comment.replies) {
            for (let reply1Index = 0; reply1Index < comment.replies.length; reply1Index++) {
                const reply = comment.replies[reply1Index];
                
                if (reply.id === targetId) {
                    return [commentIndex, reply1Index, null];
                }

                if (reply.replies){
                    for (let reply2Index = 0; reply2Index < reply.replies.length; reply2Index++) {
                        const reply2 = reply.replies[reply2Index];
                        
                        if (reply2.id === targetId) {
                            return [commentIndex, reply1Index, reply2Index];
                        }
                    }
                }
            }
        }
    }
    return [null, null, null]; // not found
}

export { fetchJsonToDB, getLocal, setLocal, clearStorage,
        addCommentReply, deleteComment, updateComment };