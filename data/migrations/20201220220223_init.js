exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());

      table.string("email", 100).notNullable();
      table.string("password", 100).notNullable();
    })
    .createTable("posts", function (table) {
      table.increments();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());

      table.string("title").notNullable();
      table.text("content").notNullable();
      table.string("slug", 100).unique();
      table.string("tags", 100);
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("posts").dropTable("users");
};
