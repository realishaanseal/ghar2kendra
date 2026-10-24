# 5-minute demo

Start from a clean state: sign in as an official, open **Admin**, click **Reset demo data**, then switch back to the citizen profile on **/login**.

1. **Report → memory** (citizen, `/report`)
   Upload a pothole photo. Gemini fills in the category and title. Submit without GPS so it lands on Outer Ring Road. The confirmation says *"This spot has been repaired before"* and links the earlier repair.
2. **Asset history** (`/memory/AST-ORR-142`)
   Your report joins the stretch's history: two earlier repairs, one resident verification, and defects returning after ~79 days on average. Reliability is *Failing*, and the reasons are listed.
3. **Proof of Resolution** (`/ticket/G2K-2026-0518`)
   Two neighbours have confirmed the mandi clean-up. The reporter's own vote is shown but not counted. Click **I'm here, it's fixed**. Quorum is reached and the ticket waits for review.
4. **Reviewer** (official profile, `/admin` → Proof Review)
   Approve the mandi ticket, and its status becomes *verified*. Hauz Khas is also waiting: three residents confirmed, and the contractor's own vote is rejected.
5. **Insights → mission** (`/insights`)
   The top pattern is waterlogging, sewage backflow and a choked drain on Lane 3, Rohini, treated as one drainage cause, with past repairs that didn't last. Open the evidence graph, then **Create mission from 4 open tickets**.
6. **Mission** (`/missions/...`)
   Draft the petition from the evidence, add a follow-up reminder and log the submission. Also show the seeded Karol Bagh "safe after dark" mission with its public timeline.
7. **Radar** (`/radar`)
   Followed places: home, college, market. The college shows the open manhole (a recurring defect) and footpath slabs blocking wheelchairs (accessibility). Home → College route: *critical hazard on this route*.
8. **Workspace** (`/workspaces/ws-kbgc`)
   The college estates office assigns the dead streetlights to its electrician, then resolves with evidence. The public ticket now needs resident attestations. Show the Analytics tab.

**Close:** every module is rule-based and explainable, AI only advises, and closure always needs people on the ground.
