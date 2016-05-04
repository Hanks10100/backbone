
const ButtonGroupView = Backbone.View.extend({
    className: 'btn-wrapper',

    initialize(options, configs) {
        const { buttons, col, offset } = options;
        this.$btns = [];
        _.each(buttons, options => {
            const $btn = this.createButton(options);
            this.$btns = $btn.add(this.$btns);
            this.$el.append($btn);
        });
    },

    // TODO: 生成多种样式的按钮
    createButton(options) {
        const className = 'btn-primary';
        return $('<button class="btn"></button>')
            .attr('type', options.type)
            .attr('id', options.id)
            .addClass(className)
            .html(options.text)
    },
});

module.exports = ButtonGroupView;
