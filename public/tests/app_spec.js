describe("LearnJS", function() {

  it("can show a problem view", function() {
    learnjs.showView("#problem-1");
    expect($(".view-container .problem-view").length).toEqual(1);
  });

  it("shows the landing page view when there is no hash", function() {
    learnjs.showView('');
    expect($(".view-container .landing-view").length).toEqual(1);
  });

  it("passes the the hash view parameter to the view function", function() {
    spyOn(learnjs, "problemView");
    learnjs.showView("#problem-42");
    expect(learnjs.problemView).toHaveBeenCalledWith("42");
  });

  it("invokes the router when loaded", function() {
    spyOn(learnjs, "showView");
    learnjs.appOnReady();
    expect(learnjs.showView).toHaveBeenCalledWith(location.hash);
  });

  it("subscribes to the hash change event", function() {
    learnjs.appOnReady();
    spyOn(learnjs, 'showView');
    $(window).trigger('hashchange');
    expect(learnjs.showView).toHaveBeenCalledWith(location.hash);
  });

  describe("problem view", function() {

    var view;

    beforeEach(function() {
      view = learnjs.problemView('1');
    });

    it("has a title that includes the problem number", function() {
      expect(view.find('.title').text().trim()).toEqual("Problem 1");
    });

    it("shows the description", function() {
      expect(view.find('[data-name="description"]').text().trim()).toEqual("What is truth?");
    });

    it("shows the problem code", function() {
      expect(view.find('[data-name="code"]').text().trim()).toEqual("function problem() { return __; }");
    });

    describe("answer section", function() {

      it("can check a correct answer by hitting a button", function() {
        view.find('.answer').val('true');
        view.find('.check-btn').click();
        expect(view.find('.result').text()).toEqual('Correct');
      });

      it('rejects an incorrect answer', function() {
        view.find('.answer').val('false');
        view.find('.check-btn').click();
        expect(view.find('.result').text()).toEqual('Incorrect');
      });
    });

  });


});
