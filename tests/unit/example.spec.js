import { shallowMount } from "@vue/test-utils";
import Welcome from "@/views/Welcome.vue";

describe("Welcome component", () => {
  it("renders component div", () => {
    const wrapper = shallowMount(Welcome, {});
    expect(wrapper.classes("welcome")).toBe(true);
  });
});
