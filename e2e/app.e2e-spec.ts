import { Eslamangular2Page } from './app.po';

describe('eslamangular2 App', () => {
  let page: Eslamangular2Page;

  beforeEach(() => {
    page = new Eslamangular2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
