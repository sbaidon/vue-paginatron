import { mount } from "@vue/test-utils";
import App from "@/App.vue";

describe("Paginator.js", () => {
  it("Renders paginator", () => {
    const wrapper = mount(App);
    expect(wrapper.vm.activeItems.length).toBe(5);
  });
});
