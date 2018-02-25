import { ShauliAppPage } from './app.po';

describe('shauli-app App', function() {
  let page: ShauliAppPage;

  beforeEach(() => {
    page = new ShauliAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
