module.exports = app =>
    app
        .route('/error')
        .get(() => {
            "use strict";
            throw new Error('testing error');
        });
