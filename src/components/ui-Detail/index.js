'use strict'

import React, {PropTypes, Component} from 'react'

class Detail extends Component {

  displayName = 'Detail'

  static propTypes = {
    onRequestClose: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    // todo: actually fetch the requested doc, and render it
    return (
      <article className='Detail'>
        <h1>Normalcy and Subnormalcy</h1>
        <p>The narrative around what is ‘normal’ and ‘expected’, especially around bodies and their abilities, influences how disabled people are treated. Certain understandings of normalcy have been used and are still used to promote eugenic practices. For example, the 1933 German Sterilization laws especially mentioned mental deficiency, schizophrenia, manic-depressive insanity, hereditary epilepsy, hereditary chorea Huntington’s, hereditary blindness, and hereditary deafness, among others, as not normal ‘conditions’.</p>
        <h3>History</h3>
        <p>According to Hacking (1996), the idea of the “normal people” displaced the enlightenment ideal of human nature during the 19th century. Canguilhem (1989) published a history of normalcy outlining the appearance and manifestation of the dichotomy of normal versus pathological at the end of the 19th century. Normal has no meaning by itself but needs a reference point (Hacking, 1996). The very concept of norm implies that there is a majority that is normal and that one can quantify and identify and possibly eliminate the deviances from the norm on the population level (Davis, 1995). Historically, one powerful for thinking about normality has been the bell curve. Often used in statistics, this allowed populations to represented as distributions of points on a graph. The majority population would fit within the middle of the distribution curve, while minorities would fall on either side of the curve. Those at the tails of the curve represented those people outside the norm. Often, those seen as falling outside of the “norm” have often been the targets for eugenic thinking. For example, individuals not reaching certain minimum levels of cognitive abilities were targeted for negative eugenic practices, often called feeble-minded, morons, mongols or other negative terms. The flip side is that those outperforming the norm were called geniuses or gifted and encouraged to procreate to pass on their desirable traits, often called positive eugenics.</p>
        <h3>Normalcy and Disabled People</h3>
        <p>Lennard Davis (1995) contends that normalcy is linked to the very meaning of disability (meaning an impairment). Disabled people are a group linked to the part of the bell curve that indicates that one underperforms in relation to the normal distribution of some ability. Indeed, the predominantly employed medical narrative of ‘disability’ views disabilities as defects, problems inherent to the person, something not normal. A cure for the ‘disability’ of the person or person-to-be is aimed at ‘improving’ toward the species-typical norm. Management of ‘disability’ has led to the sterilization of people perceived as underperforming the cognitive, mental and some physical ability norms in order to prevent a hereditary increase in people underperforming in these abilities (negative eugenics). The idea was that preventing the underperforming to procreate would lead to a decrease in the appearance of people born with such underperforming abilities freeing eventually the human race from such underperforming characteristics (Turner, 1968; Gewirtz, 1994). In recent times, prevention of the birth of a fetus classified as ‘not normal’ and de-selection of embryos not seen as ‘normal’ have been added as negative eugenic practices.</p>
        <p>The disabled people rights movements in the United States and Britain coined the term “ableism” to question and highlight the normative expectations species-typical body abilities—for example, that we expect certain abilities from different species such as that humans are supposed to walk but not to fly. In doing so, these movement have also sought to also challenge the prejudice and negative treatment people experience when their body-linked abilities are seen as sub species-typical and therefore labelled as impaired or deficient (Wolbring, 2012).</p>
        <p>To three examples will be illustrative. First, the cultural concept of neurodiversity has been used to challenge the medical deficiency discourse surrounding people with certain labels—for example, autism, asperger syndrome, attention deﬁcit-hyperactivity disorder, bipolar disorder, developmental dyspraxia, dyslexia, epilepsy, and Tourette’s syndrome are exposed to (Boundy, 2007; Sarrett, 2011). Second, people within Deaf culture have argued against the view that hearing is a deficiency. Rather, that instead it is a different way of being, part of the variation of what it is to be human (Barham, 1989; Padden & Ramsey, 1993; Siple, 1994; Bryce, 1995; Smith & Campbell, 1997; Tucker, 2010; Wolbring, 2011). Finally, Down Syndrome is often used as an example of undesirable, underperforming characteristic. It is often used to justify negative eugenic practices such as the termination of fetuses. However, alternative narratives hold that Down Syndrome is not an illness or a genetic defect exist. These, however, are far from the mainstream.</p>
        <h3>From normal to beyond normal to beyond species-typicality</h3>
        <p>Outperforming the normal is another form of ‘deviation’ from the norm. Athletes or prodigies in a variety of areas could be seen as people who represent the arm of the bell curve where people exceed the abilities of the ‘normal, the average’. Increasingly scientific and technological advancements such as genetic manipulations (e.g., somatic and germ line genetic intervention) or synthetic biology (the design of genomes from the bottom up) and implant-technologies are emerging that would allow humans to have abilities that are simply not part of being human. These emerging developments are accompanied by an emerging social dynamic that expects new abilities from the human body (Wolbring 2006, 2007; Savulescu, 2005, 2009; Harris, 2007, 2010, 2011; Ball & Wolbring, 2011). Indeed, the social movement of transhumanism is based on the idea of evolving human abilities beyond the species-typical. This development raises the question of who of the in-the-moment species-typical people will be reclassified as deficient, or ‘not normal,’ because they do not have the beyond species-typical body and abilities. Another question is whether we will use technologies such as somatic and germline genetic interventions or synthetic biology to perform a form of ‘positive eugenics’ that will add the abilities to the person.</p>
        <ul className='Container__reference'>
          <li>
            <p>Ball, N. & Wolbring, G. (2013). Portrayals of and Arguments around different Eugenic Practices: Past and Present. International Journal of Disability, Community & Rehabilitation, 12 (2), Article 2.</p>
          </li>
          <li>
            <p>Barham, J. C. (1989). Education the Deaf Culture. Journal of the British Association of Teachers of the Deaf, 13(4), 110-113.</p>
          </li>
        </ul>
      </article>
    )
  }
}

export default Detail
