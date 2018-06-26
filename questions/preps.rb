require 'json'

ja_sentences_file = ARGV[0]
output = ARGV[1]

preps_cnt = Hash.new(0)
prep_questions = {}

STDIN.each_line.with_index do |l, line_num|
  d = JSON.parse(l)

  prep = '' # just a last preposition
  tokens = []
  d['tokens'].each do |t|
    tokens << t['text']['content']
    if t['dependencyEdge']['label'] == 'PREP'
      prep = t['text']['content']
    end
  end

  unless prep.empty?
    tokens[tokens.rindex(prep)] = '___'
    prep_questions[line_num] = [tokens.join(' '), prep.downcase]
    preps_cnt[prep.downcase] += 1
  end
end

# find other preps has near cnt for choices of a question
near_preps = {}
sorted_preps = preps_cnt.sort{|a, b| b[1] <=> a[1]}
sorted_preps.each do |scoring_prep, scoring_cnt|
  top3 = Array.new(3, sorted_preps[0]) # init with max scored prep
  sorted_preps.each do |prep, cnt|
    next if prep == scoring_prep

    score = (scoring_cnt - cnt).abs
    if top3.any? {|s| s[1] > score}
      top3.push([prep, score])
      top3.shift()
    else
      near_preps[scoring_prep] = top3.map(&:first)
      break
    end
  end
end

q_no = 0
questions = []
open(ja_sentences_file).each_line.with_index do |ja_sentence, line_num|
  unless prep_questions[line_num]
    next
  end
  q = prep_questions[line_num]
  q_no += 1
  en_sentence = q[0]
  correct_choice = q[1]

  cs = (near_preps[correct_choice] + [correct_choice]).shuffle
  choices = cs.map.with_index{|c, i| {id: i+1, choice: c}}
  correct_choice_id = cs.index(correct_choice) + 1

  questions << {
    no: q_no,
    question: "#{en_sentence} (#{ja_sentence.chomp})",
    choices: choices,
    correctChoiceId: correct_choice_id
  }
end

open(output, 'w').puts(JSON.generate({questions: questions}))
