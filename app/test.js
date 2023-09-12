const db = require("./models");
const Tutorial = db.tutorials;

describe("Tutorial model", () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("should create a new tutorial", async () => {
    const tutorial = await Tutorial.create({
      title: "Test tutorial",
      description: "This is a test tutorial",
      published: true
    });

    expect(tutorial.title).toBe("Test tutorial");
    expect(tutorial.description).toBe("This is a test tutorial");
    expect(tutorial.published).toBe(true);
  });

  test("should not create a tutorial without a title", async () => {
    await expect(
      Tutorial.create({
        description: "This is a test tutorial",
        published: true
      })
    ).rejects.toThrow();
  });

  test("should update a tutorial", async () => {
    const tutorial = await Tutorial.create({
      title: "Test tutorial",
      description: "This is a test tutorial",
      published: true
    });

    await tutorial.update({
      title: "Updated tutorial",
      description: "This is an updated tutorial",
      published: false
    });

    expect(tutorial.title).toBe("Updated tutorial");
    expect(tutorial.description).toBe("This is an updated tutorial");
    expect(tutorial.published).toBe(false);
  });

  test("should delete a tutorial", async () => {
    const tutorial = await Tutorial.create({
      title: "Test tutorial",
      description: "This is a test tutorial",
      published: true
    });

    await tutorial.destroy();

    const deletedTutorial = await Tutorial.findByPk(tutorial.id);

    expect(deletedTutorial).toBeNull();
  });
});