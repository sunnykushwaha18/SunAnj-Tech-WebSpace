document.addEventListener('DOMContentLoaded', () => {
    const commentButtons = document.querySelectorAll('.comment-btn');
    const submitCommentButtons = document.querySelectorAll('.submit-comment-btn');

    commentButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const quote = event.target.closest('.quote');
            const commentsSection = quote.querySelector('.comments-section');
            commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
        });
    });

    submitCommentButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const quote = event.target.closest('.quote');
            const commentInput = quote.querySelector('.comment-input');
            const commentsContainer = quote.querySelector('.comments');

            if (commentInput.value.trim() !== '') {
                const newComment = document.createElement('p');
                newComment.textContent = commentInput.value;
                commentsContainer.appendChild(newComment);
                commentInput.value = '';
                alert('Comment submitted');
            }
        });
    });

    // Set the current date for the quote of the week
    document.getElementById('date-week').textContent = new Date().toLocaleDateString();
});
